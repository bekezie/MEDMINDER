require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
// this file is the Database Controller. It will allow us to process requests from the frontend which we will receive through the Express routes.
const MediDBController = function () {
  const mediDB = {};
  const uri = process.env.MONGO_URL;
  const DB_NAME = "MediMindDB";

  /*
   ***************USER CRUD OPERATIONS*********************
   */

  //this function will save a new user to the database
  mediDB.saveNewUser = async function (newUser) {
    let client;
    try {
      client = new MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });

      await client.connect();
      const db = client.db(DB_NAME);
      const usersCollection = db.collection("users");
      const insertResult = await usersCollection.insertOne(newUser);
      return insertResult.insertedCount;
    } finally {
      client.close();
    }
  };

  // this function will query the database for a user object by using an email string
  mediDB.getUserByEmail = async (query) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCollection = db.collection("users");
      // we will be using the user's email as their username
      const queryResult = await usersCollection.findOne({
        userEmail: query,
      });
      return queryResult;
    } finally {
      // we have to close the database connection otherwise we will overload the mongodb service.
      await client.close();
    }
  };

  //this function will look for a user based on their _id
  mediDB.getUserById = async (query) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCollection = db.collection("users");
      const queryResult = await usersCollection.findOne({
        _id: new ObjectId(query),
      });
      return queryResult;
    } finally {
      // we have to close the database connection otherwise we will overload the mongodb service.
      await client.close();
    }
  };

  // this function will update the profile of the user
  mediDB.updateUser = async (newUser) => {
    console.log(newUser);
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCollection = db.collection("users");
      const updateResult = await usersCollection.updateOne(
        {
          _id: new ObjectId(newUser.userId),
        },
        {
          $set: {
            userFirstName: newUser.userFirstName,
            userLastName: newUser.userLastName,
            userEmail: newUser.userEmail,
          },
        }
      );
      return updateResult;
    } finally {
      await client.close();
    }
  };

  /*
   ***************CONTACTS CRUD OPERATIONS*********************
   */

  //this function will return pharmacy contacts for a user
  mediDB.getPharmContacts = async (userId) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const profileCollection = db.collection("pharmacyContacts");
      const contacts = await profileCollection
        .find({ patientId: userId })
        .toArray();
      return contacts;
    } finally {
      client.close();
    }
  };

  //this function will return physician contacts for a user
  mediDB.getPhysContacts = async (userId) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const profileCollection = db.collection("physicianContacts");
      const contacts = await profileCollection
        .find({ patientId: userId })
        .toArray();
      return contacts;
    } finally {
      client.close();
    }
  };

  //this function will return emergency contacts for a user
  mediDB.getEmerContacts = async (userId) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const profileCollection = db.collection("emergencyContacts");
      const contacts = await profileCollection
        .find({ patientId: userId })
        .toArray();
      return contacts;
    } finally {
      client.close();
    }
  };

  //create a pharm contact for a user
  mediDB.createPharmContact = async (newPharmContact) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("pharmacyContacts");
      const createResult = await medicationCollection.insertOne(
        newPharmContact
      );
      return createResult;
    } finally {
      client.close();
    }
  };

  mediDB.createEmerContact = async (newEmerContact) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("emergencyContacts");
      const createResult = await medicationCollection.insertOne(newEmerContact);
      return createResult;
    } finally {
      client.close();
    }
  };
  mediDB.createPhysContact = async (newEmerContact) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("physicianContacts");
      const createResult = await medicationCollection.insertOne(newEmerContact);
      return createResult;
    } finally {
      client.close();
    }
  };

  // this function will update the contact info of a pharmacy contact
  mediDB.updatePharmContact = async (newPharmContact) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const contactsCollection = db.collection("pharmacyContacts");
      const updateResult = await contactsCollection.updateOne(
        {
          _id: new ObjectId(newPharmContact.id),
        },
        {
          $set: {
            pharmName: newPharmContact.pharmName,
            pharmLocation: newPharmContact.pharmLocation,
            pharmPhoneNum: newPharmContact.pharmPhoneNum,
          },
        }
      );
      return updateResult;
    } finally {
      await client.close();
    }
  };

  mediDB.deletePharmContact = async (id) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const contactsCollection = db.collection("pharmacyContacts");
      const deleteResult = await contactsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      return deleteResult;
    } finally {
      client.close();
    }
  };

  // this function will update the contact info of an emergency contact
  mediDB.updateEmerContact = async (newEmerContact) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const contactsCollection = db.collection("emergencyContacts");
      const updateResult = await contactsCollection.updateOne(
        {
          _id: new ObjectId(newEmerContact.id),
        },
        {
          $set: {
            emerName: newEmerContact.emerName,
            emerRelationship: newEmerContact.emerRelationship,
            emerPhoneNum: newEmerContact.emerPhoneNum,
          },
        }
      );
      return updateResult;
    } finally {
      await client.close();
    }
  };

  mediDB.deleteEmerContact = async (id) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("emergencyContacts");
      const createResult = await medicationCollection.deleteOne({
        _id: new ObjectId(id),
      });
      return createResult;
    } finally {
      client.close();
    }
  };

  // this function will update the contact info of a physician contact
  mediDB.updatePhysContact = async (newPhysContact) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const contactsCollection = db.collection("physicianContacts");
      const updateResult = await contactsCollection.updateOne(
        {
          _id: new ObjectId(newPhysContact.id),
        },
        {
          $set: {
            physName: newPhysContact.physName,
            physSpecialty: newPhysContact.physSpecialty,
            physPhoneNum: newPhysContact.physPhoneNum,
          },
        }
      );
      return updateResult;
    } finally {
      await client.close();
    }
  };

  mediDB.deletePhysContact = async (id) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("physicianContacts");
      const createResult = await medicationCollection.deleteOne({
        _id: new ObjectId(id),
      });
      return createResult;
    } finally {
      client.close();
    }
  };

  /*
   ***************MEDICATION CRUD OPERATIONS*********************
   */

  //this function will return all medications for a user
  mediDB.getUserMedications = async (userId) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("medication");
      const medications = await medicationCollection
        .find({ patientId: userId })
        .toArray();
      return medications;
    } finally {
      client.close();
    }
  };

  //this function will return a given medication
  mediDB.getSingleMedication = async (medicationId) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("medication");
      const medication = await medicationCollection
        .find({ _id: new ObjectId(medicationId) })
        .toArray();
      return medication;
    } finally {
      client.close();
    }
  };

  // this function will create a new medication instance
  mediDB.createMedicationInstance = async (newMedObject) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("medication");
      const createResult = await medicationCollection.insertOne(newMedObject);
      return createResult;
    } finally {
      client.close();
    }
  };

  mediDB.updateMedicationInstance = async (newMedObject) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("medication");
      const updateResult = await medicationCollection.updateOne(
        {
          _id: new ObjectId(newMedObject._id),
        },
        {
          $set: {
            medicineName: newMedObject.medicationName,
            medicineDosage: newMedObject.medicationDosage,
            daysNeeded: newMedObject.daysNeeded,
            timesNeeded: newMedObject.timesNeeded,
          },
        }
      );
      return updateResult;
    } finally {
      client.close();
    }
  };

  // this function will mark a medication as taken for the given day (0 - 6 representing Sunday to Monday)
  mediDB.takenMedication = async (medicationId, day, taken, time) => {
    console.log("takenStatusObject." + day + "." + time);

    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("medication");

      const updateVal = {};
      updateVal["takenStatusObject." + day + "." + time] = taken;
      const updatedMedication = await medicationCollection.findOneAndUpdate(
        {
          _id: new ObjectId(medicationId),
        },
        { $set: updateVal }
      );
      console.log(updatedMedication);
      return updatedMedication;
    } finally {
      client.close();
    }
  };

  //this function will delete a medication instance
  mediDB.deleteMedicationInstance = async (medId) => {
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("medication");
      const deleteResult = await medicationCollection.deleteOne({
        _id: new ObjectId(medId),
      });
      console.log(deleteResult.result);
      return deleteResult.result;
    } finally {
      client.close();
    }
  };

  // this function will reset all of the weekly
  mediDB.resetAllUserMedicatons = async (userId) => {
    console.log(userId);
    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db(DB_NAME);
      const medicationCollection = db.collection("medication");
      const updateResult = await medicationCollection.updateMany(
        {
          patientId: userId,
        },
        {
          $set: {
            takenStatusObject: {
              0: { 0: false, 1: false, 2: false },
              1: { 0: false, 1: false, 2: false },
              2: { 0: false, 1: false, 2: false },
              3: { 0: false, 1: false, 2: false },
              4: { 0: false, 1: false, 2: false },
              5: { 0: false, 1: false, 2: false },
              6: { 0: false, 1: false, 2: false },
            },
          },
        }
      );
      console.log(updateResult.result);
      return updateResult.result;
    } finally {
      client.close();
    }
  };

  return mediDB;
};

module.exports = MediDBController();
