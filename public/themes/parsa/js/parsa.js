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
function addToCart(attribute_id, count) {
    $.ajax({
        type: 'post',
        url: `${SITE_URL}${URLS.ADD_TO_CART}`,
        data: {
            attribute_id,
            count,
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
