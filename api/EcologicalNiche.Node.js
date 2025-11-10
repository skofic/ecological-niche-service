// Warning: requests below are going to be executed in parallel

// request List all species 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/species/list',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Return species chorology 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/species/chorology?species=Abies%20alba',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Occurrence grid cells statistics 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/map/stat',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Occurrence grid cells as array 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/map/array?start=0&limit=1000',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Occurrence grid cells as GeoJSON points 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/map/point?start=0&limit=1000',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Species occurrence stats by period and scenario 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/map/species/stat?species=Abies%20alba&period=fut2035&scenario=rcp45',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Species occurrence data by period and scenario as array 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/map/species/array?start=0&limit=1000&species=Abies%20alba&period=fut2035&scenario=rcp45',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Species occurrence data by period and scenario as GeoJSON points 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/map/species/point?start=0&limit=1000&species=Abies%20alba&period=fut2035&scenario=rcp45',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Indicators pair statistics for period and scenario 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/pair/stat?period=1991-2020&scenario=rcp45&X=bio01&Y=bio12',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Indicators pair values for period and scenario as array 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/pair/array?period=1991-2020&scenario=rcp45&X=bio01&Y=bio12&start=0&limit=100',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Indicators pair values for period and scenario as object 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/pair/object?period=1991-2020&scenario=rcp45&X=bio01&Y=bio12&start=0&limit=100',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Indicators pair statistics for species, period and scenario 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/pair/species/stat?period=1991-2020&scenario=rcp45&X=bio01&Y=bio12&species=Abies%20alba',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Indicators pair values for species, period and scenario as array 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/pair/species/array?period=1991-2020&scenario=rcp45&X=bio01&Y=bio12&start=0&limit=100&species=Abies%20alba',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Indicators pair values for species, period and scenario as object 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/pair/species/object?period=1991-2020&scenario=rcp45&X=bio01&Y=bio12&start=0&limit=100&species=Abies%20alba',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Indicators pair statistics for unit, period and scenario 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/pair/unit/stat?period=1991-2020&scenario=rcp45&X=bio01&Y=bio12&unit=DEU00001',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Indicators pair values for unit, period and scenario as array 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/pair/unit/array?period=1991-2020&scenario=rcp45&X=bio01&Y=bio12&start=0&limit=100&unit=DEU00001',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});

// request Indicators pair values for unit, period and scenario as object 
(function(callback) {
    'use strict';
        
    const httpTransport = require('http');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'localhost',
        port: '8529',
        path: '/_db/GeoService/scat/pair/unit/object?period=1991-2020&scenario=rcp45&X=bio01&Y=bio12&start=0&limit=100&unit=DEU00001',
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});
