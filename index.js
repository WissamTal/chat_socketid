// on instancie express
const app = require("express")();

// on crée le serveur http
const http = require("http").createServer(app);

// on instance socket.io

const io = require("socket.io")(http);

// on crée la route /
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// on ecoute l'evenement "connexion" de socket.io

io.on("connection", (socket) => {
    console.log("une connexion s'active");
// on ecoute les deconnexion
    socket.on("disconnect", () => {
        console.log("un utilisateur s'est deconnecté");
    });

    //on gere le chat
    socket.on("chat_message", (msg) => {
        //on relais le message vers tous les utilisateur connectés
       io.emit("received_message", msg);
    })
});

// on va demander au serveur http de répondre sur le port 3000
http.listen(3000, () => {
    console.log("J ecoute le port 3000")
})