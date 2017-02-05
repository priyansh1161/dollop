
function Dollop() {
    // this function will be helpful when you need to call an async opt one after other in sync
    var dollop = {};
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
    return dollop;
}