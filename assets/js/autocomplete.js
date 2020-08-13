var selector = document.querySelectorAll("[searchable]");
var styleLi = `border-bottom: 1px solid #e5e5e5;padding: 5px 7px;`;
if (selector.length) {
	selector.forEach((selectorItem, selectorIndex) => {
		selector[selectorIndex].addEventListener("keyup", function (el) {
			var containerWidth = selector[selectorIndex].offsetWidth;
			if (document.querySelector("[data=searchable-container]"))
				document.querySelector("[data=searchable-container]").remove();

			if (selector[selectorIndex].value.length) {
				var container = document.createElement(`div`);
				container.setAttribute("data", "searchable-container");
				container.style = `
                    margin-top: 2px;
                    position: absolute;
                    background-color: #fff;
                    border: 1px solid #e5e5e5;
                    width: ${containerWidth}px;
                    max-height: 350px;
                    overflow-x: auto;
                    -webkit-box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.18);
                    -moz-box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.18);
                    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.18);
                `;
				apiKey(container, selector[selectorIndex].value, selectorIndex);

				selector[selectorIndex].parentNode.insertBefore(
					container,
					selector[selectorIndex].nextSibling
				);
			}
		});
	});
}
/**
 * change data.first_name base on result of your API
 * @param {search} search
 */
async function search(search, selectorIndex) {
	var url = selector[selectorIndex].getAttribute("searchable-data");
	var data = [];
	if (url.length) {
		if (url.indexOf("http") === -1) {
			var dataUrl = JSON.parse(url);
			data = dataUrl.filter(
				(itm) => itm.toLowerCase().indexOf(search.toLowerCase()) > -1 && itm
			);
		} else {
			if (search.length) {
				await fetch(`${url}&first_name=${search}`)
					.then((res) => res.json())
					.then((res) => {
						if (res._meta.code == 200) {
							var _data = [];
							res.result.forEach((data, idx) => {
								_data.push(data.first_name);
							});
							data = _data;
						} else {
							console.log(res);
							console.log("ERR: Failed to get data!");
						}
					})
					.catch((err) => {
						console.log("ERR", err);
					});
			}
		}
	}
	return data;
}

async function apiKey(container, val, selectorIndex) {
	container.innerHTML = `<p style="text-align:center;">loading...</p>`;
	var data = await search(val, selectorIndex);
	container.innerHTML = null;
	var dataUl = document.createElement("ul");
	dataUl.setAttribute(
		"style",
		`padding: 0;
        margin: 0;
        list-style-type: none;`
	);
	data.forEach((data, idx) => {
		var dataLi = document.createElement("li");
		dataLi.setAttribute("onclick", `clickable(this, ${selectorIndex});`);
		dataLi.setAttribute("onmouseover", `hoverable(this, ${selectorIndex});`);
		dataLi.setAttribute("style", styleLi);
		dataLi.innerHTML = data;
		dataUl.appendChild(dataLi);
	});
	container.appendChild(dataUl);
}

function hoverable(el, selectorIndex) {
	var elementLi = selector[
		selectorIndex
	].nextElementSibling.getElementsByTagName("li");
	if (elementLi.length) {
		for (var i = 0; i < elementLi.length; i++) {
			elementLi[i].setAttribute("style", `${styleLi}cursor:pointer;`);
		}
		el.setAttribute(
			"style",
			`${styleLi}background-color: #e3e3e3;cursor: pointer;`
		);
	}
}

function clickable(el, selectorIndex) {
	selector[selectorIndex].value = el.innerHTML.trim();
	document.querySelector("[data=searchable-container]").remove();
}
