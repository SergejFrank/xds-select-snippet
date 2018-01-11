function generateXdsSelect(elem) {
    var defaultParams = {
        wrapperClass: "xds-select-snippet",
        button: "xds-select-button",
        option: "xds-select-option",
        value: "xds-select-value",
        list: "xds-select-dropdown-menu-list",
        open: "open"
    };

    var changeSelectedOption = function (index) {
        var el = this;
        if (el.select.disabled) return;
        el.select.selectedIndex = index;
        el.close();
        el.update();
    };

    var update = function () {
        var el = this;
        if (el.select.disabled) {
            el.wrapper.classList.add("disabled");
        } else {
            el.wrapper.classList.remove("disabled");
        }

        el.value.textContent = el.select.options[el.select.selectedIndex].textContent;
    };

    var xds = {
        wrapper: document.createElement('div'),
        button: document.createElement('button'),
        value: document.createElement('div'),
        list: document.createElement('ul'),
        select: elem,
        update: update,
        changeSelectedOption: changeSelectedOption,
        toggleOpen: function () {
            this.wrapper.classList.toggle(defaultParams.open)
        },
        open: function () {
            this.wrapper.classList.add(defaultParams.open)
        },
        close: function () {
            this.wrapper.classList.remove(defaultParams.open)
        }

    };

    xds.wrapper.classList.add(defaultParams.wrapperClass);
    xds.button.classList.add(defaultParams.button);
    xds.value.classList.add(defaultParams.option);
    xds.value.classList.add(defaultParams.value);
    xds.list.classList.add(defaultParams.list);

    xds.wrapper.appendChild(xds.button);
    xds.button.appendChild(xds.value);
    xds.wrapper.appendChild(xds.list);

    //add options to xds-select
    for (var i = 0; i < xds.select.options.length; i++) {
        var li = document.createElement('li');
        li.classList.add(defaultParams.option);
        li.textContent = xds.select.options[i].textContent;
        li.setAttribute("selectedIndex", i);
        li.addEventListener('click', function () {
            xds.changeSelectedOption(this.getAttribute("selectedIndex"))
        });
        xds.list.appendChild(li);
    }

    //toggle xds-select open state
    xds.button.addEventListener('click', function () {
        if (xds.select.disabled) return;
        xds.toggleOpen();
    });

    // close xds-select if clicked outside
    window.addEventListener('click', function (e) {
        if (!xds.wrapper.contains(e.target)) {
            xds.close();
        }
    });

    //update xds-select on select change
    xds.select.addEventListener('change', xds.update);

    //insert after select
    xds.select.parentNode.insertBefore(xds.wrapper, xds.select.nextSibling);

    //hide select
    elem.style.display = "none";

    //initialize xds-select
    xds.update();

    return xds;
}

var selects = document.querySelectorAll("select");

for (var j = 0; j < selects.length; j++) {
    generateXdsSelect(selects[j]);
}