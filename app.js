function render(contacts){
    var HTML = '';
    for (var i = 0; i < contacts.length; i++) {
        HTML += '<tr data-id="' + contacts[i].id + '">' +
            +   '<td><label>' + contacts[i].key + '</label></td>'
            + '</tr>';
    }
    document.querySelector('.contact-list').innerHTML = HTML;
}

function updateContactList(){
    cozysdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n); }', function(err, res) {
        if (err != null) return alert(err);
        cozysdk.run('Password', 'all', {}, function(err, res) {
            if (err != null) return alert(err);
            var contacts = JSON.parse("" + res);
            /* contacts == [
             {id:"323274828329", key:"Jane;Willson"},
             {id:"323274827428", key:"John;Smith"}
             ]*/
            render(contacts);
        });
    });
}

function onSendChanged(){
    var contactName = document.querySelector('.send').value.trim();
    var values = {n: contactName};
    cozysdk.create('Password', values, function(err, res) {
        if (err != null) return alert(err);
        // res.id == "8239283928326"
        document.querySelector('.send').value = '';
        updateContactList();
    });
}

document.addEventListener("DOMContentLoaded", updateContactList);
document.querySelector('.send').addEventListener('change', onSendChanged);