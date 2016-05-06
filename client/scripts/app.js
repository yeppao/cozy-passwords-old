function routerHandler() {

    var $panels = $('[role="panel"]');
    var $menuItems = $('[role="navigation"] li');

    function handleRouteChange() {

        var hash;
        // Default screen management.
        if(window.location.hash.length === 0) {
            hash = "#crud-create";
        } else {
            hash = window.location.hash;
        }

        // Reset panels visibility.
        $panels.hide();

        // Select panel, and show it.
        var $panel = $panels.filter(hash).show();

        // Unselect previously selected item.
        $menuItems.filter('[aria-selected="true"]').attr('aria-selected', false);

        // Mark proper menu item as selected.
        $menuItems.find('[href="' + hash + '"]')
            .parent()
            .attr('aria-selected', true);
    }

    window.onpopstate = handleRouteChange;
    handleRouteChange();
}


function createPasswordHandler() {

    var $pass = $('#crud-create .pass pre');
    var $result = $('#crud-create .result');
    var $resultStatus = $result.find(' p.status span');
    var $resultBody = $result.find('pre');
    var $name = $('#create-name');
    var $login = $('#create-login');
    var $password = $('#create-password');
    var $website = $('#create-website');
    var $button = $('#crud-create button');

    function onFieldChange() {
        var password = {};

        if ($name.val() && $name.val().length > 0) {
            password.name = $name.val();
        }

        if ($login.val() && $login.val().length > 0) {
            password.login = $password.val();
        }

        if ($password.val() && $password.val().length > 0) {
            password.password = $password.val();
        }
        
        if ($website.val()) {
            password.website = $website.val();
        }

        $pass.html(JSON.stringify(password, null, 2));
    }

    function onSubmit() {

        var password = $pass.html();
        $result.removeClass('error').removeClass('success');

        $.ajax({
            'method': 'POST',
            'url': 'passwords',
            'data': password,
            'headers': {
                'content-type': 'application/json'
            },
            'complete': function(xhr, textStatus) {
                $resultStatus.html(xhr.status);

                if (xhr.status !== 201) {
                    $result.addClass('error');
                    $resultBody.html(xhr.responseText);
                } else if (!xhr.responseJSON) {
                    $result.addClass('error');
                    $resultBody.html('The created document is expected in ' +
                        'the response');
                } else {
                    $result.addClass('success');
                    var formatted = JSON.stringify(xhr.responseJSON, null, 2);
                    $resultBody.html(formatted);
                }
            }
        });
    }

    $name.keyup(onFieldChange);
    $login.keyup(onFieldChange);
    $password.keyup(onFieldChange);
    $website.keyup(onFieldChange);
    $button.click(onSubmit);
}

function fetchPasswordHandler() {

    var $result = $('#crud-fetch .result');
    var $resultStatus = $result.find(' p.status span');
    var $resultBody = $result.find('pre');
    var $id = $('#fetch-id');
    var $button = $('#crud-fetch button');

    function onSubmit() {

        var id = $id.val();
        $result.removeClass('error').removeClass('success');

        if (!id) {
            $result.addClass('error');
            $resultStatus.html('');
            $resultBody.html('ID is a mandatory field.');
            return;
        }

        $.ajax({
            'method': 'GET',
            'url': 'passwords/' + id,
            'complete': function(xhr, textStatus) {
                $resultStatus.html(xhr.status);

                if (xhr.status === 404) {
                    $result.addClass('success');
                    $resultBody.html('If the ID is not related to a document' +
                        ', an error code should be returned');
                } else if (xhr.status !== 200) {
                    $result.addClass('error');
                    $resultBody.html(xhr.responseText);
                } else if (!xhr.responseJSON) {
                    $result.addClass('error');
                    $resultBody.html('The document is expected in the ' +
                        'response, or the status code should ' +
                        'be 404');
                } else {
                    $result.addClass('success');
                    var formatted = JSON.stringify(xhr.responseJSON, null, 2);
                    $resultBody.html(formatted);
                }
            }
        });
    }

    $button.click(onSubmit);
}

function updatePasswordHandler() {

    var $pass = $('#crud-update .pass pre');
    var $result = $('#crud-update .result');
    var $resultStatus = $result.find(' p.status span');
    var $resultBody = $result.find('pre');
    var $name = $('#update-name');
    var $login = $('#update-login');
    var $password = $('#update-password');
    var $website = $('#update-website');
    var $id = $('#update-id');
    var $button = $('#crud-update button');

    function onFieldChange() {
        var password = {};

        if ($name.val() && $name.val().length > 0) {
            password.name = $name.val();
        }

        if ($login.val() && $login.val().length > 0) {
            password.login = $password.val();
        }

        if ($password.val() && $password.val().length > 0) {
            password.password = password.val();
        }

        if ($website.val()) {
            password.website = $website.val();
        }

        $pass.html(JSON.stringify(password));
    }

    function onSubmit() {

        var password = $pass.html();
        var id = $id.val();
        $result.removeClass('error').removeClass('success');

        if (!id) {
            $result.addClass('error');
            $resultStatus.html('');
            $resultBody.html('ID is a mandatory field.');
            return;
        }

        $.ajax({
            'method': 'PUT',
            'url': 'passwords/' + id,
            'data': password,
            'headers': {
                'content-type': 'application/json'
            },
            'complete': function(xhr, textStatus) {
                $resultStatus.html(xhr.status);

                if (xhr.status === 404) {
                    $result.addClass('success');
                    $resultBody.html('If the ID is not related to a document' +
                        ', an error code should be returned');
                } else if (xhr.status !== 200) {
                    $result.addClass('error');
                    $resultBody.html(xhr.responseText);
                } else if (!xhr.responseJSON) {
                    $result.addClass('error');
                    $resultBody.html('The updated document is expected in ' +
                        'the response, or the status code ' +
                        'should be 404');
                } else {
                    $result.addClass('success');
                    var formatted = JSON.stringify(xhr.responseJSON, null, 2);
                    $resultBody.html(formatted);
                }
            }
        });
    }

    $name.keyup(onFieldChange);
    $login.keyup(onFieldChange);
    $password.keyup(onFieldChange);
    $website.keyup(onFieldChange);
    $button.click(onSubmit);
}

function deletePasswordHandler() {

    var $result = $('#crud-delete .result');
    var $resultStatus = $result.find(' p.status span');
    var $resultBody = $result.find('pre');
    var $id = $('#delete-id');
    var $button = $('#crud-delete button');

    function onSubmit() {

        var id = $id.val();
        $result.removeClass('error').removeClass('success');

        if (!id) {
            $result.addClass('error');
            $resultStatus.html('');
            $resultBody.html('ID is a mandatory field.');
            return;
        }

        $.ajax({
            'method': 'DELETE',
            'url': 'passwords/' + id,
            'complete': function(xhr, textStatus) {
                $resultStatus.html(xhr.status);

                if (xhr.status === 404) {
                    $result.addClass('success');
                    $resultBody.html('If the ID is not related to a document' +
                        ', an error code should be returned');
                } else if (xhr.status !== 204) {
                    $result.addClass('error');
                    $resultBody.html(xhr.responseText);
                } else {
                    $result.addClass('success');
                    var formatted = JSON.stringify(xhr.responseJSON, null, 2);
                    $resultBody.html(formatted);
                }
            }
        });
    }

    $button.click(onSubmit);
}

function listPasswordHandler() {

    var $result = $('#crud-list .result');
    var $resultStatus = $result.find(' p.status span');
    var $resultBody = $result.find('pre');
    var $button = $('#crud-list button');

    function onSubmit() {

        $result.removeClass('error').removeClass('success');

        $.ajax({
            'method': 'GET',
            'url': 'passwords/',
            'complete': function(xhr, textStatus) {
                $resultStatus.html(xhr.status);

                if (xhr.status !== 200) {
                    $result.addClass('error');
                    $resultBody.html(xhr.responseText);
                } else {
                    $result.addClass('success');
                    var formatted = JSON.stringify(xhr.responseJSON, null, 2);
                    $resultBody.html(formatted);
                }
            }
        });
    }

    $button.click(onSubmit);
}

window.onload = function() {
    routerHandler();
    createPasswordHandler();
    fetchPasswordHandler();
    updatePasswordHandler();
    deletePasswordHandler();
    listPasswordHandler();
};