const express = require("express");
const app = express();
const aws = require("aws-sdk");
const bodyparser = require("body-parser")

app.set("view engine", "ejs");
app.set("Views", "./Views");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const dynamoDB = new aws.DynamoDB.DocumentClient({
    region: "us-east-2",
    accessKeyId: "",
    secretAccessKey: ""
})

app.get("/", (req, res) => {
    let params = {
        TableName: "SanPham",
    }
    dynamoDB.scan(params, (err, data) => {
        if (err) throw err
        res.render("index", {
            dataSP: data.Items
        })
    })
})

app.post("/delete", (req, res) => {
    const {id} = req.body;
    console.log(id);
    let params = {
        TableName: "SanPham",
        Key: {
            maSP: parseInt(id)
        }
    }
    dynamoDB.delete(params, (err, data) => {
        if (err) throw err
        res.redirect("/")
    })
})
app.post("/deleteAPI", (req, res) => {
    const { ma } = req.body;
    let params = {
        TableName: "SanPham",
        Key: {
            maSP: parseInt(ma)
        }
    }
    dynamoDB.delete(params, (err, data) => {
        if (err) throw err
        res.json({ msg: true })
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Start ${PORT}`))