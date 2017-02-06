
function Dollop() {
    // this function will be helpful when you need to call an async opt one after other in sync
    var dollop = function () {
        
    };
    dollop.prototype.asyncLoop = function (iterations, data, async, cb) {
        var done = false;
        var index = 0;
        var loop = {
            next : function () {
                if(done){
                    return;
                }
                if(index < iterations){
                    index++;
                    async(loop,data);
                }
                else {
                    done = true;
                    cb();
                }
            },
            iteration : function () {
                return index -1;
            }
        };
        loop.next();
        return loop;
    };
    dollop.prototype.ajax = function (obj) {
        var data = obj.data || null;
        var xhr = new XMLHttpRequest();
        xhr.open(obj.type, obj.url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log(xhr.status);
                if ( xhr.status >= 200 && xhr.status <=209) {
                    console.log(xhr.responseText);// 'This is the returned text.'
                    obj.success(xhr.responseText);
                }
                else {
                    console.log('Error: ' + xhr.status); // An error occurred during the request.
                    obj.error(xhr.status);
                }
            }
        };
        xhr.send(data);
    };
    dollop.prototype.ajax({
        type : 'GET',
        url : 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
        success : function(res){
            
        },
        error : function (xhr) {

        }
    });
    return dollop;
}
Dollop();