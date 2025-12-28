import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';


//封装柱状图
//1.把功能代码都放到这个组件中
// //2.把可变的部分抽象成prop参数

const BarChart = ({ title }) => {
  const charRef = useRef(null);
  useEffect(() => {
    const chartDom = charRef.current;
    ////useRef方法？

    //保证dom可用再渲染图表
    //获取渲染图标的dom节点
    // const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom); //图表初始化生成实例对象
    //图表参数
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [10, 40, 70],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(93, 155, 218, 0.2)'
          }
        }
      ]
    };
    //使用图表参数完成渲染
    option && myChart.setOption(option);

  }, [])

  return <div ref={charRef} style={{ width: '500px', height: '400px' }}></div>
  // id='main'
}

export default BarChart