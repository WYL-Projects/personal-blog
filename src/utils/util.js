//让某个元素动态的更改颜色，arr是rgb数组，里面有三个值分别代表rgb
export function Colorful(className, arr, max=175, min=72) {
    const targets = document.getElementsByClassName(className);
    let flag = true;
    Array.from(targets).forEach(target=>{
      target.style.color = `rgb(${arr[0]},${arr[1]},${arr[2]})`;
    })
    function colorful(index) {
      let timer = setInterval(() => {
        flag?arr[index]++:arr[index]--;
        Array.from(targets).forEach(target=>{
          target.style.color = `rgb(${arr[0]},${arr[1]},${arr[2]})`;
        })
        if (arr[index] == min || arr[index] == max) {
          flag=!flag;
          clearInterval(timer);
          index == 2 ? (index = 0) : index++;
          colorful(index);
        }
      }, 20);
    }
    colorful(2);
  }

  export  function  ColorfulLabelCloud(labels){
      let r,g,b,fontSize;
      console.log(labels)
      if(labels!=null&&labels.length != 0){
          Array.prototype.slice.call(labels).forEach(ele=>{
              r = Math.random()*255,
                  g = Math.random()*255,
                  b = Math.random()*255,
                  fontSize = Math.floor(Math.random()*12+16);
              ele.style.color = `rgb(${r},${g},${b})`;
              ele.style.fontSize = fontSize+"px";
          })
      }

  }