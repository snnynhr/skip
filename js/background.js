var id = null;

function checkURLTab(tab) {
    return tab == undefined ||
        tab.url.indexOf('https://www.youtube.com/watch?v=') == -1;
}

function execScript(id, file, callback) {
    chrome.tabs.executeScript(id, {
        file: file
    }, callback);
}

function checkValidUrl(id, arr) {
    chrome.tabs.get(id, function(tab) {
        if (tab.url.indexOf('https://www.youtube.com/watch?v=') == -1) {
            executeScript(id, {
                code: 'history.forward();'
            }, null);
        }
    });
}

chrome.commands.onCommand.addListener(function(command) {
    console.log(command);
    console.log(id);
    if (id != null) {
        chrome.tabs.get(id, function(tab) {
            if (checkURLTab(tab)) {
                id = null;
            }
        });
    }
    if (command == 'skip-forward') {
        if (id == null) {
            chrome.tabs.query({
                url: 'https://www.youtube.com/watch?v=*'
            }, function(tabs) {
                if (tabs.length > 0) {
                    execScript(tabs[0].id, 'js/skip-forward.js', null);
                }
            });
        } else {
            execScript(id, 'js/skip-forward.js', null);
        }
        console.log('skip-forward');
    } else if (command == 'skip-back') {
        if (id == null) {
            chrome.tabs.query({
                url: 'https://www.youtube.com/watch?v=*'
            }, function(tabs) {
                if (tabs.length > 0) {
                    execScript(tabs[0].id, 'js/skip-back.js', function(arr) {
                        chrome.tabs.get(tabs[0].id, function(tab) {
                            if (tab.url.indexOf('https://www.youtube.com/watch?v=') == -1) {
                                chrome.tabs.executeScript(id, {
                                    code: 'history.forward();'
                                }, null);
                            }
                        });
                    });
                }
            });
        } else {
            execScript(id, 'js/skip-back.js', function(arr) {
                chrome.tabs.get(id, function(tab) {
                    if (tab.url.indexOf('https://www.youtube.com/watch?v=') == -1) {
                        chrome.tabs.executeScript(id, {
                            code: 'history.forward();'
                        }, null);
                    }
                });
            });
        }
        console.log('Skip back');
    } else if (command == 'set-playlist') {
        console.log('set');
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            id = tabs[0].id;
        });
    } else {
        console.log('Unknown command');
    }
});