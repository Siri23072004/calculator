const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

// Result page
app.post("/calculate", function(req, res){

    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let op = req.body.operation;

    let result;

    if(op === "add") result = num1 + num2;
    else if(op === "sub") result = num1 - num2;
    else if(op === "mul") result = num1 * num2;
    else if(op === "div") result = num2 !== 0 ? num1 / num2 : "Cannot divide by 0";

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Result</title>

        <style>
            body{
                margin:0;
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                font-family:'Poppins', sans-serif;
                color:white;

                background: linear-gradient(-45deg, #667eea, #764ba2, #6a11cb, #2575fc);
                background-size: 400% 400%;
                animation: gradientMove 8s ease infinite;
            }

            @keyframes gradientMove {
                0% { background-position:0% 50%; }
                50% { background-position:100% 50%; }
                100% { background-position:0% 50%; }
            }

            .card{
                background: rgba(255,255,255,0.1);
                padding:40px;
                border-radius:20px;
                text-align:center;
                backdrop-filter: blur(15px);
                border:1px solid rgba(255,255,255,0.2);
                box-shadow:0 0 25px rgba(0,0,0,0.5);
                animation: fadeUp 0.8s ease;
            }

            @keyframes fadeUp{
                from { transform: translateY(40px); opacity:0; }
                to { transform: translateY(0); opacity:1; }
            }

            h1{
                font-size:42px;
            }

            .result{
                font-size:36px;
                margin-top:15px;
                color:#ffcc00;
                text-shadow:0 0 20px rgba(255,204,0,0.9);
            }

            a{
                display:inline-block;
                margin-top:20px;
                padding:12px 25px;
                background:#ffffff;
                color:#333;
                border-radius:25px;
                text-decoration:none;
                font-weight:bold;
                transition:0.3s;
            }

            a:hover{
                transform:scale(1.1);
                box-shadow:0 0 15px white;
            }
        </style>
    </head>

    <body>
        <div class="card">
            <h1>✨ Result</h1>
            <div class="result">${result}</div>
            <a href="/">← Back</a>
        </div>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log("Server running");
});