//DEPENDENCY IMPORTS
const express  = require('express')
const {MongoClient} = require('mongodb')
const serverApp = express();
const connectionString ='mongodb+srv://soumil_123:soumil_123@cluster0.zsix5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const bodyParser = require("body-parser");
require('./dotenv')

//MIDDLE WARE CONFIGS
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: false }));
// serverApp.set('views', 'ejs')
serverApp.use(express.static('public'))

//\\-----ROUTES------//\\

//MONGO CONNECT
MongoClient.connect(connectionString, (err,client) => {
    //ERROR HANDLING
    if(err){
        return console.error(err)
    }
    //RETRIEVE THE DB
    const employeesDB = client.db('users-data')
    const employeesCollection = employeesDB.collection('users');
    console.log('Database connected');

        //GET
    serverApp.get('/', (req, res) => {
        employeesDB.collection('users').find({}).toArray()
        .then( employees=>{res.render('index.ejs', {employees:employees})
         })
         .catch(err =>console.error(err));
    })

    serverApp.get('/empInfo', (req, res) => {
        employeesDB.collection('users').find({}).toArray()
        .then( employees=>{res.render('empInfo.ejs', {employees:employees})
         })
         .catch(err =>console.error(err));
    })

    //CREATE user information
        serverApp.post('/createUser',(req,res) => {
            //apply promise on this
            employeesCollection.insertOne(req.body)
            .then(result => {res.redirect('/empInfo')})
            .catch(error => console.error(error));
          
        });

    //UPDATE
    serverApp.put('/updateEmployee', (req, res)=>{
        console.log('put called');
        employeesCollection.findOneAndUpdate(
        {
            empName: req.body.empName
        }, 
        {
            $set: {
                empName: req.body.newEmpName,
                empID: req.body.newEmpID
            }
        },
        {
            upsert : true
        }
        )
        .then(result => {res.send('Updated the info')
        })
        .catch(error=> console.error(error));
    });

    //DELETE
    serverApp.delete('/deleteEmployee', (req, res)=>{
        employeesCollection.findOneAndDelete(
        {
            empName: req.body.empName
        }
        )
        .then(result => {
            if(result.deletedCount === 0){
                return res.send('Delete operation failed')
            }
            else{
                return res.send('Deleted')
            }
        })
        .catch(error=> console.error(error));
    })
});
serverApp.listen(5000, ()=>{
    console.log('server is running on 5000')
});