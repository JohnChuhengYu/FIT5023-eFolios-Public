const {onRequest} = require ("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.getBookCount = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const snapshot = await admin.firestore().collection("books").get();
            const count = snapshot.size;
            res.status(200).json({ count });
        } catch (error) {
            console.error("Error getting book count:", error.message);
            res.status(500).send("Error counting books");
        }
    });
});

exports.getAllBooks = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const snapshot = await admin.firestore().collection("books").get();
            const books = [];
            snapshot.forEach((doc) => {
                books.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).json(books);
        } catch (error) {
            console.error("Error getting all books:", error.message);
            res.status(500).send("Error fetching all books");
        }
    });
});