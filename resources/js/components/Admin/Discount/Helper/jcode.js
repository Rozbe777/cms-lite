import $ from "jquery";

$(function () {
    $("ul#select-item li").click(function () {
        let indexsm = $(this).index();
        $("ul#select-item li").removeClass("active");
        $(this).addClass("active");
        $("ul.contentsssc li").removeClass("active")
        $("ul.contentsssc li#boxess").eq(indexsm).addClass("active")
    })


    $("ul#main-child-sels.status li").click(function () {
        let indexes = $(this).index();
        if (indexes === 2) {
            setTypeAct("pro")
            $(".seconds.category").removeClass("active");
            setDis(true)

            $(".seconds.product").addClass("active");
        } else if (indexes === 3) {
            setTypeAct("cat")

            $(".seconds.product").removeClass("active");
            setDis(true)

            $(".seconds.category").addClass("active");
        } else if (indexes === 0) {
            setTypeAct("allPriceCart")
            setDis(false)
            $(".seconds.product").removeClass("active");
            $(".seconds.category").removeClass("active");
        } else {
            setTypeAct("allPriceCartWSendPrice");
            $(".seconds.product").removeClass("active");
            $(".seconds.category").removeClass("active");
        }
    })


    $("ul#main-child-sels.userDis li").click(function () {
        let indexes = $(this).index();
        if (indexes === 2) {
            setTypeUser("speUser")
            $(".seconds.category").removeClass("active");
            setDisUser(true)
            setUserGroups('');


            $(".seconds.product").addClass("active");
        } else if (indexes === 1) {
            setTypeUser("groupUser")

            $(".seconds.product").removeClass("active");
            setDisUser(true)

            $(".seconds.category").addClass("active");
        } else if (indexes === 0) {
            setTypeUser("allUser")
            setUserGroups("allUser");
            setDisUser(true)
            $(".seconds.product").removeClass("active");
            $(".seconds.category").removeClass("active");
        } else {

        }
    })


    $("ul#main-child-sels.groupUserSO li").click(function () {
        let indexes = $(this).index();
        if (indexes === 0) {
            setUserGroups("userOldSel");
            setDisUser(true)
        } else if (indexes === 1) {
            setUserGroups("userOldNotSel")
            setDisUser(true)
        } else {

        }
    })

    $(".main-selected").click(function () {
        $(".input-searchsss").addClass("active");
        $(".input-searchsss input").focus();
    })

})


