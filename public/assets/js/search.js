import "regenerator-runtime/runtime";
const searchContent = document.querySelector("#searchContent");

import axios from "axios";

export const searchQuery = async (city, bedrooms, bathrooms) => {
  let p = {
    city,
    bedrooms,
    bathrooms,
  };
  for (const keys in p) {
    if (p[keys] == "") {
      delete p[keys];
    }
  }

  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/estate/search",
      params: p,
    });
    if (res.status == 200) {
      if (res.data.length > 0) {
        searchContent.style.display = "block";
        res.data.data.forEach((estate) => {
          const td = document.getElementById("SearchTitleElement");
          const HTMLel = `                
                          <h5>
                            <a style="color: black" href='/estate/${estate.slug}'>${estate.title}</a>
                          </h5>
                          <h6>
                            <span style="color: black">$${estate.price}</span>
                          </h6>
                          <hr>`;
          td.insertAdjacentHTML("afterbegin", HTMLel);
        });
      }
      // searchContent.onmouseout = function () {
      //   searchContent.style.display = "none";
      // };
      console.log(res.data);
      console.log(res.data.data);
    }
  } catch (err) {}
};

// // http://127.0.0.1:4000/search?city=ibadan&rooms=1&beds=1
