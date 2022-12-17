//sync
// console.log("line1");
// console.log("line2");
// setTimeout(() => {
//   console.log("line 3");
// }, 3000);
// console.log("line4");

//callback
//higher order function
// const callback = (food) => {
//   console.log("line 1", food);
// };
// setTimeout(() => {
//   //process food
//   const food = "Rice and Beans";
//   callback(food);
// }, 3000);
// console.log("Line 2");
// console.log("Line 3");

// function a1(a2) {
//   console.log("object");
//   a2("done", (r1, c) => {
//     console.log("done111");
//   });
// }

// function a2(r, a3) {
//   console.log("This is " + r);
//   a3("done2", () => {
//     console.log("done222");
//   });
// }
// a1(a2);

// a1((a2) => {
//   a2((a3) => {
//     a3((a4) => {
//       a4((a5) => {});
//     });
//   });
// });

// a1()
// a2()
// a3()

//class are blueprint for object

// const s1 = {
//   name: "J",
//   department: "M",
//   jump: function () {
//     console.log(`Jumping for ${this.name}`);
//   },
//   jump2() {},
//   jump3: () => {},
// };

// function jump4() {
//   console.log(this.nick);
//   console.log(`${this.name} is jumping4`);
// }

// jump4();
// s1.jump();
// const s2 = {
//   name: "K",
//   department: "G",
// };

// s2.jump = jump4;

// s2.jump();

// class ClassName {}

// class Students {
//   //   name = "Student";
//   constructor(nickname) {
//     this.nick = nickname;
//     this.name = "Student";
//     // console.log(`Creating ${nickname}`);
//   }
//   jump() {
//     console.log(this);
//     console.log(`${this.nick} is jumping1`);
//   }
//   jump2 = function () {
//     console.log(this);
//     console.log(`${this.nick} is jumping2`);
//   };
//   jump3 = () => {
//     console.log(this);
//     console.log(`${this.nick} is jumping3`);
//   };
// }

// const ss1 = new Students("Rasta");
// const ss2 = new Students("Maxwell");
// const ss3 = new Students("Eniola");

// // console.log(ss1);
// // console.log(ss2);
// // console.log(ss3);

// ss3.nick = "Eniola 2";

// //modify
// ss1.name = "Student ss1";
// // console.log(ss1);
// // console.log(ss2);
// // console.log(ss3);

// ss1.jump3();
// ss2.jump3();
// ss3.jump3();

//promise
// state=> pending ->{resolved/fullfilled, rejected}

function callback(resolve, reject) {
  setTimeout(() => {
    resolve("This is the result");
  }, 3000);
}

const promise = new Promise(callback);

promise
  .then((data) => {
    //document.querySelector(".spinner").classList.remove("show");
    document.querySelector("h1").innerHTML = data;
  })
  .catch((data) => {
    document.querySelector(".spinner").classList.remove("show");
    document.querySelector("h1").innerHTML = data;
    // alert(`An error occurred: ${data}`);
  })
  .finally(console.log("promise is done"));

const apiPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: "Rasta",
      dept: "Mathematics",
      courses: ["MAT", "CSC", "STA"],
    });
  }, 1000);
});

//pending......[fulfilled(resolve), rejected(reject)]

apiPromise
  .then((result) => {
    console.log("Resolved....");
    const box = document.querySelector("#root");
    for (const key in result) {
      //console.log(key, result[key]);
      const p = document.createElement("p");
      p.innerHTML = `<span class='key'>${key}:</span><span>${result[key]}</span>`;
      box.appendChild(p);
    }
    console.log(Object.keys(result));
    console.log(Object.values(result));
    // console.log(Object.entries(result));
  })
  .catch((err) => {
    console.log("rejected...");
    console.log(err);
  })
  .finally(() => {
    //document.querySelector(".spinner").classList.remove("show");
  });

// fetch API

fetch("https://quotable.io/quotes")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err.message);
  });

// 2xx -> sucesss
// 3xx -> redirect
// 4xx -> client
// 5xx -> server
fetch("https://quotable.io/quotes")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//async & await

// function normalFunction() {}

// async function asyncFunc() {
//   try {
//     const resp = await fetch("https://quotable.io/quotes", {
//       method: "GET",
//     });
//     const data = await resp.json();
//     console.log(data);
//     document.body.style.background = `linear-gradient(to bottom right, ${generateColor()}, ${generateColor()}, ${generateColor()})`;
//   } catch (error) {
//     console.log("Error Occurred");
//   } finally {
//     console.log("Finally....");
//   }
// }

// asyncFunc();

// function gRandomColor() {
//   return Math.trunc(Math.random() * 256);
// }
// function generateColor() {
//   return `rgba(${gRandomColor()},${gRandomColor()},${gRandomColor()})`;
// }

// generateColor();
// const data = [
//   {
//     _id: "",
//     author: "",
//     content: "",
//     dateAdded: "",
//     tags: [],
//     colors: ["color1", "color2"],
//   },
// ];
