import formidable from "formidable";
import path from "path";
import fs from "fs";
import connection from "../configs/DBConnection";
var fileBusy = [];

// get("/")
let enregistrer_pdf = (req, res) => {
  try {
    connection.query("SELECT * FROM users", (err, rows, fields) => {
      for (let r of rows) {
        console.log(r["nom"]);
      }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("form");
};

//post("api/upload")
let apiUpload = (req, res) => {
  // uploading multiple file system using formidable
  const selected = [];
  const form = new formidable.IncomingForm();

  //filter all file pdf
  form.on("file", function (fields, file) {
    // console.log("file == ", file.mimetype);
    if (file.mimetype === "application/pdf") {
      selected.push(file);
    }
  });

  //
  form.parse(req, function (err, fields, files) {
    for (let file of selected) {
      var oldpath = file.filepath;
      //   console.log("file path == ", file);
      var newPath = path.join(
        __dirname,
        "uploads",
        "file_" + Date.now() + ".pdf"
      );
      //   console.log("api_upload ", newPath);
      var rawData = fs.readFileSync(oldpath);
      fs.writeFileSync(newPath, rawData);
    }
  });

  form.on("end", function () {
    res.redirect("/listePdf");
  });
};

//get (/list)
let liste_pdf = (req, res) => {
  const uploadDir = path.join(__dirname, "uploads");
  var listfile = fs.readdirSync(uploadDir);
  listfile = listfile.filter(function (item) {
    return !fileBusy.includes(item);
  });
  res.render("tablelist", { msg: listfile });
};

//post ("saveInfo/:filename")
let saveInfo = (req, res) => {
  var filename = req.params.filename;
  var CurrenPath = path.join(__dirname, "uploads", filename);
  var newPath = path.join(__dirname, "to_validate", filename);
  var fournisseur = req.body.fournisseur;
  var Iban = req.body.iban;
  var montant = req.body.montant;
  var fournisseur = req.body.fournisseur;
  // remove file
  // fs.unlinkSync(pathFile)
  //move file
  try {
    fs.renameSync(CurrenPath, newPath);
    res.send("Validation with success : " + JSON.stringify(req.body));
  } catch (err) {
    throw err;
    res.send(err);
  }
};

//get("/show")
let show = (req, res) => {
  var filename = req.query.filename;
  var filepath = path.join(__dirname, "to_validate", filename);
  var readStream = fs.createReadStream(filepath);
  readStream.on("open", function (error) {
    readStream.pipe(res);
  });
};

//get("/edit")
let edit = (req, res) => {
  var filename = req.query.filename;
  var filepath = path.join(__dirname, "uploads", filename);
  var readStream = fs.createReadStream(filepath);
  fileBusy.push(filename);
  readStream.on("open", function (error) {
    readStream.pipe(res);
  });
};

//get("/closeFile/:filename")
let closeFile = (req, res) => {
  let filename = req.params.filename;
  fileBusy = fileBusy.filter(function (el) {
    return el != filename;
  });
  res.redirect("/listePdf");
};

//get("/notfoundpage/:filename",
let notfound = (req, res) => {
  let filename = req.params.filename;
  res.render("pagenofound", { filename: filename });
};

//.get("/edite/:filename"

let editeFilename = (req, res) => {
  let filename = req.params.filename;
  var filepath = path.join(__dirname, "uploads", filename);

  let canRead = fs.existsSync(filepath);

  if (canRead) {
    res.render("edit1", { filename: filename });
  } else {
    res.redirect("/notfoundpage/" + filename);
  }
};

let table = (req, res) => {
  res.render("tablelist");
};

let profile = (req, res) => {
  res.render("profile");
};

let historique = (req, res) => {
  const uploadDir = path.join(__dirname, "to_validate");
  var data = fs.readdirSync(uploadDir);
  res.render("historique", { data: data });
};

module.exports = {
  enregistrer_pdf: enregistrer_pdf,
  apiUpload: apiUpload,
  liste_pdf: liste_pdf,
  saveInfo: saveInfo,
  show: show,
  edit: edit,
  closeFile: closeFile,
  notfound: notfound,
  editeFilename: editeFilename,
  table: table,
  profile: profile,
  historique: historique,
};
