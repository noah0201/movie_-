# 关于React-hook的一个小项目

## 查询电影小项目

-- Header.jsx组件
    存放页面顶部大标题，用于组件就是增加代码的复用性

-- Movie.jsx组件
    负责展示我们电影，结构是展示电影标题加电影图片加年份
    我们通过App.js中传入数据到组件中进行排版

    const poster=movie.Poster==='N/A'?DEFAULT_PLACEHOLDER_IMAGE:movie.Poster
    注：此处我们进行判断数据中的Poster值的图片链接是否失效或者不存在，不存在我们就用我们自己提供的图片素材替换，存在我们就存入

-- Search.jsx组件
    页面结构，搜索框和搜索按钮
    我们用到了React的hook，useState
    const [searchValue, setSearchValue] = useState("");
    这里我们作用是进行搜索框的值进行改变

    handleSearchInputChanges函数 处理搜索框进行输入配合useState使用
    resetInputField函数搜索完负责清空
    callSearchFunction函数配合props使用，将搜索框的内容与后台API进行信息匹配从而得到它

-- App.js组件
    页面结构调用组件，分为头部，搜索栏，还有呈现每部电影
    电影中进行判断，loading状态存在和不存在错误时进入加载页面，反之进入判断错误信息，然后再嵌套判断，错误是否存在，存在就呈现错误页面，不存在错误就呈现通过api查找到的电影进行循环遍历出来
    该项目难点都在这，我们用了两种写法
      第一种：通过useState做三种状态，分别是页面加载状态，存储电影数据，错误信息
              利用useEffect钩子进行通过api获取数据，然后解析数据，然后在将数据存入movie变量中，过程loading为false不使用
              定义search函数，寻找过程中将钩子loading启用，错误信息不存在，然后通过调用api将搜索相关的数据进行判断数据库那边是否回应，正确就将数据存入放入movie中呈现页面，过程不进行加载，反之加载错误信息

      第二种：我们利用useReducer钩子进行分发，将状态做一个整合进行分发，通过switch进行匹配调用数据，功能与第一种相似
             但是更好用。
      