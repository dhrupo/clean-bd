const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 4000;

require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tbv6w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('uploadImage'));
app.use(fileUpload());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const servicesCollection = client.db("cleanbd").collection("services");
  const ordersCollection = client.db("cleanbd").collection("orders");
  const reviewsCollection = client.db("cleanbd").collection("reviews");
  const adminCollection = client.db("cleanbd").collection("admin");

  console.log('database connected');

  app.post('/isAdmin', (req, res) => {
    const user = req.body.user;
    adminCollection.find({ user: user })
      .toArray((err, admin) => {
        res.send(admin.length > 0);
      })
  })

  app.get('/services', (req, res) => {
    servicesCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.delete('/deleteService/:id', (req, res) => {
    servicesCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0);
      })
      .catch(error => console.log(error));
  })

  app.post('/addService', (req, res) => {
    const file = req.files.file;
    const name = req.body.serviceName;
    const price = req.body.servicePrice;
    const service = {
      serviceName: name,
      servicePrice: price,
      image: file.name
    }

    const filePath = `${__dirname}/uploadImage/${file.name}`;

    file.mv(filePath, err => {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: 'Failed to upload image' })
      }

      servicesCollection.insertOne(service)
        .then(result => {
          res.send(result.insertedCount > 0)
        })
        .catch(error => console.log(error))
      return res.send({ name: file.name, path: `/${file.name}` })
    })
  });

  // app.get('/product/:id', (req, res) => {
  //   ordersCollection.find({ key: req.params.key })
  //     .toArray((err, documents) => {
  //       res.send(documents[0]);
  //     })
  // })

  app.get('/reviews', (req, res) => {
    reviewsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.post('/addAdmin', (req, res) => {
    const user = req.body;
    adminCollection.insertOne(user)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
      .catch(error => console.log(error))
  })

  app.post('/addReview', (req, res) => {
    const review = req.body;
    reviewsCollection.insertOne(review)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
      .catch(error => console.log(error))
  });

  app.get('/orders', (req, res) => {
    ordersCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.post('/addOrder', (req, res) => {
    const order = req.body;
    ordersCollection.insertOne(order)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
      .catch(error => console.log(error))
  });

  app.patch('/editOrder/:id', (req, res) => {
    const order = req.body;
    ordersCollection.updateOne({ _id: ObjectId(req.params.id) }, {
      $set: {
        serviceName: order.serviceName,
        user: order.user,
        paymentId: order.paymentId,
        cardLastFourDigit: order.cardLastFourDigit,
        date: order.date,
        status: order.status
      }
    })
      .then(result => {
        res.send(result.modifiedCount > 0);
      })
      .catch(error => console.log(error))
  });


  app.delete('/orderDelete/:id', (req, res) => {
    ordersCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0);
      })
      .catch(error => console.log(error));
  })

  app.get('/order', (req, res) => {
    ordersCollection.find({ $or: [{ 'user': req.query.name }] })
      .toArray((err, documents) => {
        res.send(documents);
      })
  })
  // client.close();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})