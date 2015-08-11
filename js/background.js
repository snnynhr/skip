var id = null;
chrome.commands.onCommand.addListener(function(command) {
    console.log(command);
    if (id != null) {
        chrome.tabs.get(id, function(tab) {
            if (tab == undefined ||
                tab.url.indexOf('https://www.youtube.com/watch?v=') == -1) {
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
                    chrome.tabs.executeScript(tabs[0].id, {
                        file: 'js/skip.js'
                    }, null);
                }
            });
        } else {
            chrome.tabs.executeScript(id, {
                file: 'js/skip.js'
            }, null);
        }
        console.log('skip-forward');
    } else if (command == 'skip-back') {
        if (id == null) {
            chrome.tabs.query({
                url: 'https://www.youtube.com/watch?v=*'
            }, function(tabs) {
                if (tabs.length > 0) {
                    chrome.tabs.executeScript(tabs[0].id, {
                        code: 'history.back();'
                    }, null);
                }
            });
        } else {
            chrome.tabs.executeScript(id, {
                code: 'history.back();'
            }, null);
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