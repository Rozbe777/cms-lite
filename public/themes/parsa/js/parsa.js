/*
* CONST
* */
const SITE_URL = `${location.origin}/`;
const URLS = {
    ADD_TO_CART: 'cart/add'
};
/*
* END CONST
* */

/*
* PUBLIC FUNCTIONS
* */
function getToken() {
    return $('meta[name="csrf-token"]').attr('content');
}

/*
* END PUBLIC FUNCTIONS
* */

/*
* AJAX REQUESTS
* */
function addToCart() {
    let attribute_id = $("#attribute_id").val();
    let count = $("#count").val();
    let remaining = 10;
    $.ajax({
        type: 'post',
        url: `${SITE_URL}${URLS.ADD_TO_CART}`,
        data: {
            attribute_id,
            count,
            remaining,
            _token: getToken()
        },
        headers: {
            'X-CSRF-TOKEN': getToken()
        },
        success: function (result) {
            if (result.status) {
                alert('ok');
            } else {
                alert(result.message);
            }
        }
    });
}

/*
*END AJAX REQUESTS
* */
