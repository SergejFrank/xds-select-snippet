function generateXdsSelect(elem) {
    var defaultParams = {
        wrapperClass: "xds-select-snippet",
        button: "xds-select-button",
        option: "xds-select-option",
        value: "xds-select-value",
        list: "xds-select-dropdown-menu-list",
        open: "open"
    };

    var changeSelectedOption = function (li) {
        var el = this;
        var index = li.getAttribute("data-selected-index");
        if (el.select.disabled) return;
        el.select.selectedIndex = index;
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

    var moveFocuesedElement = function (i) {
        var el = this;
        var tmp = el.focusedElement + i;

        if(tmp >= 0 && el.select.options.length > tmp){
            el.focusedElement = tmp;
        }

        el.removeFocus();
        el.changeFocuesedElement();
    };


    var changeFocuesedElement = function () {
        var el = this;
        var lis = el.list.getElementsByTagName('li');

        var li = lis.item(el.focusedElement);
        li.classList.add("focus");

        // scroll to element if overflow on the bottom
        if(li.offsetTop+li.offsetHeight > el.list.scrollTop+el.list.offsetHeight){
            el.list.scrollTop = li.offsetTop+li.offsetHeight-el.list.offsetHeight;
        }

        //scroll to element if overflow on the top
        if(el.list.scrollTop > li.offsetTop){
            el.list.scrollTop = li.offsetTop;
        }
    };


    var removeFocus = function(){
        var el = this;

        var lis = el.list.getElementsByTagName('li');

        [].forEach.call(lis, function(li) {
            li.classList.remove("focus");
        });
    };

    var selectFocused = function () {
        var el = this;
        var lis = el.list.getElementsByTagName('li');

        var li = lis.item(el.focusedElement);
        el.changeSelectedOption(li);
    };


    var xds = {
        focusedElement: -1,
        wrapper: document.createElement('div'),
        button: document.createElement('button'),
        value: document.createElement('div'),
        list: document.createElement('ul'),
        select: elem,
        update: update,
        changeSelectedOption: changeSelectedOption,
        moveFocuesedElement: moveFocuesedElement,
        changeFocuesedElement: changeFocuesedElement,
        selectFocused: selectFocused,
        removeFocus: removeFocus,
        toggleOpen: function () {
            this.wrapper.classList.contains(defaultParams.open)? this.close() : this.open();
        },
        open: function () {
            this.wrapper.classList.add(defaultParams.open);
            this.focusedElement = this.select.selectedIndex;
            this.changeFocuesedElement();
        },
        close: function () {
            this.wrapper.classList.remove(defaultParams.open);
            this.removeFocus();
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
        li.setAttribute("data-selected-index", i);


        //select clicked element
        li.addEventListener('click', function () {
            xds.changeSelectedOption(this);
            xds.close();
        });

        //change focused element to the hovered one
        li.addEventListener('mouseover', function () {
            var lis = xds.list.getElementsByTagName('li');
            xds.removeFocus();
            this.classList.add("focus");
            var that = this;
            for (var j=0;j<lis.length;j++){
                if (lis.item(j)==that){
                    xds.focusedElement = j;
                }
            }
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


    //navigate through xds-select
    window.addEventListener('keydown', function (e) {
        if (xds.wrapper.classList.contains(defaultParams.open)){

            switch (e.keyCode) {
                case 27:
                    // On "Escape" closes the panel
                    xds.close();
                    break;
                case 13:
                case 32:
                    // On "Enter" or "Space" selects the focused element as the selected one
                    xds.selectFocused();
                    break;
                case 38:
                    // On "Arrow up" set focus to the prev option if present
                    xds.moveFocuesedElement(-1);
                    break;
                case 40:
                    // On "Arrow down" set focus to the next option if present
                    xds.moveFocuesedElement(+1);
                    break;
            }

        };
    });

    //hide native select
    elem.style.display = "none";

    //initialize xds-select
    xds.update();

    return xds;
}

var selects = document.querySelectorAll(".select");

for (var j = 0; j < selects.length; j++) {
    generateXdsSelect(selects[j]);
}