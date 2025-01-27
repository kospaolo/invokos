require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

if (!process.env.FIREBASE_SERVICE_ACCOUNT)
  throw new Error('Firebase Service Account is not set. Please add your Firebase Service Account data.');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const databaseUrl = ''

if (!databaseUrl)
  throw new Error('Database URL is not set. Please add your Firebase database URL.');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseUrl
});

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/fetch-services', async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('services').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/get-service/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    const data = (await db.collection('services').doc(id).get()).data();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post('/api/add-service', async (req, res) => {
  try {
    const db = admin.firestore();
    const data = req.body;
    const docRef = await db.collection('services').add(data);
    res.json({ message: 'Service added', id: docRef.id });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.put('/api/edit-service/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    const service = req.body;
    await db.collection('services').doc(id).update(service);
    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.delete('/api/delete-service/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    await db.collection('services').doc(id).delete();
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/fetch-offers', async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('offers').get();
    const offers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(offers);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post('/api/add-offer', async (req, res) => {
  try {
    const db = admin.firestore();
    const offer = req.body;
    const docRef = await db.collection('offers').add(offer);
    res.json({ id: docRef.id, ...offer });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.put('/api/edit-offer/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    const offer = req.body;
    await db.collection('offers').doc(id).update(offer);
    res.json({ message: 'Offer updated successfully' });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.delete('/api/delete-offer/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    await db.collection('offers').doc(id).delete();
    res.json({ message: 'Offer deleted' });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post('/api/add-customer', async (req, res) => {
  try {
    const db = admin.firestore();
    const customer = req.body;
    const docRef = await db.collection('customers').add(customer);
    res.json({ id: docRef.id, ...customer });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/fetch-customers', async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('customers').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/get-customer/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    const data = (await db.collection('customers').doc(id).get()).data();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.put('/api/edit-customer/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    const customer = req.body;
    await db.collection('customers').doc(id).update(customer);
    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.delete('/api/delete-customer/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    await db.collection('customers').doc(id).delete();
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/fetch-invoices', async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('invoices').get();
    const invoices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(invoices);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post('/api/add-invoice', async (req, res) => {
  try {
    const db = admin.firestore();
    const invoice = req.body;
    const docRef = await db.collection('invoices').add(invoice);
    res.json({ id: docRef.id, ...invoice });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.put('/api/edit-invoice/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    const invoice = req.body;
    await db.collection('invoices').doc(id).update(invoice);
    res.json({ message: 'Invoice updated successfully' });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.delete('/api/delete-invoice/:id', async (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;
    await db.collection('invoices').doc(id).delete();
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/search-customers', async (req, res) => {
  try {
    const db = admin.firestore();
    const query = req.query.q.toLowerCase();
    console.log(query)

    const customersRef = db.collection('customers');
    const snapshot = await customersRef.get();
    const customers = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      const firstName = data.firstname.toLowerCase();
      const lastName = data.lastname.toLowerCase();

      if (firstName.includes(query) || lastName.includes(query)) {
        customers.push({ id: doc.id, ...doc.data() });
      }
    });

    res.json(customers);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
