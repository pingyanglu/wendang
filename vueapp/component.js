var Main=Vue.component('Main',{
    template:`
        <div class="template">
            <div class="body">
                <div class="left">
                <router-view name="left"></router-view>
                </div>
                <div class="right">
                <router-view name="right"></router-view>
                </div>
            </div> 
        </div> 
    `
})
var Left=Vue.component('Left',{
    template:`
            <ul>
                <li v-for="item in parse">
                    <router-link :to="'#'+item.id">{{item.title}}</router-link>
                    <ul>
                        <li  v-for="item1 in item.child">
                          <router-link   :to="'#'+item1.id">{{item1.title}}</router-link> 
                        </li>
                    </ul>
                </li>    
            </ul>`,
    data(){
        return {
            menu:""
        }
    },
    mounted(){
        fetch("./demo.txt").then(function(e){
            return e.json();
        }).then((e)=>{
            this.menu=e;
        })
    },
    computed:{
        parse(){
            var arr=[];
            for(var i in this.menu){
                var obj = this.menu[i]
                obj.child=[];
                if(obj.pid==0){
                    arr.push(obj)
                }
            }
            for(var j in arr){
                for(var k in this.menu){
                    if(this.menu[k].pid==arr[j].id){
                        arr[j].child.push(this.menu[k])
                    }
                }

            }
            return arr;
        }
    },
    methods:{
        /*parse(){
            var arr=[];
            for(var i in this.menu){
                var obj = this.menu[i]
                obj.child=[];
                if(obj.pid==0){
                    arr.push(obj)
                }
            }
                for(var j in arr){
                    for(var k in this.menu){
                        if(this.menu[k].pid==arr[j].id){
                            arr[j].child.push(this.menu[k])
                        }
                    }

                }
            return arr;
        }*/
    },
    /*
    * 一个属性或者样式  连续不断的发生变化
    * 在你的视觉上面呈现动画的形态
    * 眼睛  连续没有间断 24帧
    *
    * h5提供新方法  帧数==电脑赫兹(匹配电脑赫兹)
    * */
    watch:{
 //       $route   当前地址栏信息  当前路由信息
        $route(){/*当地址发生改变时*/
            var num = this.$route.hash.slice(1)
            var pos = document.querySelector("#a"+num).offsetTop-50;
            var vm = this;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({number: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos}, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.number.toFixed(0)
                })
                .start()

            animate()
           /* if(num>1000){
                cancelAnimationFrame(t);
            }else{
                t = requestAnimationFrame();
            }*/
        }
     }
})
var Right=Vue.component('Right',{
    template:`
        <div class="markdown-body">
             <div v-html="data">
                       {{data}}
             </div> 
        </div>
       
    `,
    data(){
        return {
            data:""
        }
    },
    mounted(){
        fetch("html.txt").then(function (e) {
            return e.text()
        }
    ).then((e)=> {
            this.data=e;
        })
    }
})
var quick=Vue.component("quick",{
    template:
        `
    <div>
        这个是省略一万字的快速入门手册,请自行脑补{{data}}
    </div>
        `,
    data(){
        return {
            data:"..."
        }
    }
})