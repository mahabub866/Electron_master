let { remote } = require("electron");
// console.log(process.versions.electron);

const { PosPrinter } = remote.require("electron-pos-printer");
// const {PosPrinter} = require("electron-pos-printer"); //dont work in production (??)

const path = require("path");

let webContents = remote.getCurrentWebContents();
let printers = webContents.getPrinters(); //list the printers





const data = [
  {
    type: "image",
    path: path.join(__dirname, "assets/logo.jpg"), // file path
    position: "center", // position of image: 'left' | 'center' | 'right'
    width: "auto", // width of image in px; default: auto
    height: "60px", // width of image in px; default: 50 or '50px'
    css: {
      "margin-bottom": "10px",
    }
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Transworld Mercantile Corporation",
    style: `text-align:center;`,
    css: { "font-weight": "700", "font-size": "16px",
            "margin-bottom": "10px",
  },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Token: G025",
    style: `text-align:center;`,
    css: { "font-weight": "800", "font-size": "20px",
    "margin-bottom": "10px", },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
    value:"Registration",
    css: {
      "font-size": "12px",
      "font-family": "sans-serif",
      "text-align": "center",
      "margin-bottom": "10px",
    },
  },
  
  {
    type: "qrCode",
    value: "https://hidayahsmart.solutions/",
    height: 60,
    width: 60,
    style: "margin-left:42%",
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
    value:"&nbsp;",
    css: {
      "margin-bottom": "10px",
    },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
    value:"&nbsp;",
    css: {
      "margin-bottom": "10px",
    },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
    value:"&nbsp;",
    css: {
      "margin-bottom": "10px",
    },
  },
  
];

function date() {
  const x = new Date();

  const y = "0" + x.getHours();
  const z = "0" + x.getMinutes();
  const s = "0" + x.getSeconds();
  const h = "0" + x.getDate();
  const ano = x.getFullYear().toString().substr(-2);
  const ms = x.getMonth();
  const meses = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    y.substr(-2) +
    ":" +
    z.substr(-2) +
    ":" +
    s.substr(-2) +
    " -  " +
    h.substr(-2) +
    "/" +
    meses[ms]
  );
}

function print() {
  let printerName;
  let widthPage;

  var p = document.getElementsByName("printer");
  var w = document.getElementsByName("width");

  for (var i = 0, length = p.length; i < length; i++) {
    if (p[i].checked) {
      printerName = p[i].value;

      break;
    }
  }

  for (var i = 0, length = w.length; i < length; i++) {
    if (w[i].checked) {
      widthPage = w[i].value;

      break;
    }
  }

  console.log(printerName, widthPage);

  const options = {
    preview: false, // Preview in window or print
    width: widthPage, //  width of content body
    margin: "0 0 0 0", // margin of content body
    copies: 1, // Number of copies to print
    printerName: printerName, // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true,
  };

  const now = {
    type: "text",
    value: "" + date(),
    style: `text-align:center;`,
    css: { "font-size": "12px", "font-family": "sans-serif" },
  };

  const d = [...data, now];

    PosPrinter.print(d, 
      {
        printerName:'token_printer',
        silent:true,
        preview:false,
        width: '350px',
        
    })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  
}
