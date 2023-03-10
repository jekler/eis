# eis
Eight's IE SVG

2023/02/27

release v1.0.0

eis建立在sie(http://sie.sourceforge.jp/) v15版本基础上,新增各项功能并集成其它模块与组件后发布，授权协议LGPL v3。

** 新模块
* eos：兼容opera（< v11.60）与firefox(< v4)低版本的svg渲染库，可以在html下以inline方式使用svg，无须采用xhtml。接口、参数与使用方式（动态渲染方式略有不同，详见说明文档）与eis保持一致。
* eis.htc：eis的动态载入渲染组件，使用dhtml component，可配置于css中动态渲染指定selector的组件。

**新功能
* 支持inline编写方式，与现代通行浏览器兼容
* 支持外链use
* 新增组动画，可以用一项配置对一组图元进行统一动画配置，与最新浏览器兼容
* 实现repeatDur与repeatCount（原实现方式无法使用）
* 更改事件触发与任务调度机制，以实现条件触发动画
* 更换任务队列算法以支持异步任务队列
* 支持外链和外部资源的故障检测、重发和异步加载，以稳定的获取和处理图像

**新特性
* 支持href简写（不需要xlink）
* 升级svg parser以支持更多属性的继承和配置
* 升级iframe背景检测机制，使其与css渲染之背景尽可能一直
* 新增ie-前缀的非标准属性配置方式，可以覆盖原属性，在局部存在兼容问题时可用此hacker。
* 改造事件关联算法，以支持触发点后置声明的关联
* 新增frameRate参数，可配置在不同浏览器下的帧率
* 新增delay参数，可配置在不同运行时环境中是否渲染和延迟渲染
* 新增type、element等一组参数，可配置筛选器，以对指定的节点渲染
* 新增scale属性，保持在动画中按绝对坐标而非换算坐标移动，与其他浏览器兼容
* 新增退出时动画计算强制终止，以节省资源
* 新增透明度渐变动画支持
* 使用animate兼容animateColor功能（保留animateColor元素功能），与svg规范保持一致
* 支持ie8透明背景

**bug修复
* 透明度计算错误
* 绝对路径判断条件缺失
* viewport计算错误
* 修正动画中viewBox在部件移动至负坐标时，坐标原点发生偏移错误
* 修正多任务异步加载时，doc对象混乱错误
* 修正载入新节点顺序，避免ie不定状态下载入frame异常
* 修正clip hidden，避免动画时局部物体移动导致整体clip被清除
* 修正任务结束的处理机制，在多任务情况下，出现各种局面故障时，能尽量正确处理其余部分
* 修正path路径计算的一个bug
* repeat（count）计算错误
* 修正frameRate算法
* 修正页面退出忘记恢复screen.updateInterval错误
* 修正最后帧计算错误
* 修正endEvent处理逻辑，以保证freeze与恢复原态的功能实现
* 其它若干细微错误调整

**已知问题
* 部分效果未实现（font的特效渲染，font的path排版等）
* transform除skew外，rotate等其它实现都有或多或少的问题
* 部分动画效果未实现（animateMation的path运动，animationTransform动画）
* 部分动画同时使用时存在冲突（如透明渐变无法与其它aniamte属性和animateMotion同时使用，animateColor无非与animateMotion同时使用，事件状态机冲突导致）
* 一组任务中多处动画同时运行时，最后一项动画先运行完后其余动画停止（使用单动画处理引擎有关）
* 与现代浏览器不同，不能使用css对svg元素进行fill、stroke、动画或其他特效渲染。因为ie8以下古典浏览器不能识别svg元素，也就不能匹配css排版。但svg内嵌css注解可以正常使用。
* 与现代浏览器不同，不能使用js在svg渲染以后对svg元素进行操作以改变页面图像效果。因为ie8以下古典浏览器不能识别svg元素，也就不存在操作元素。同时，eis引擎已经改写页面的svg内容并将其嵌入另外的iframe中，所以js也无法获取这些节点。但反之，svg内的元素事件可以通过js获取和操作页面其它元素，这是单向的。svg本身的动态效果和事件响应可以使用支持的SIML动画。
* 除了ie8以外，图片背景不能真正透明化，而是以原背景色拟态。这样就无法使多个图片叠加，也不能采用渐变或复杂图案的背景。(由于该项目svg容器采用了iframe框架，而iframe在ie5.5-7版本没有真正的透明背景，只有ie8在标准模式下可以得到真正的透明背景)
* 与css3pie存在潜在冲突，当css3pie使用htc或onload即时运行时，在ie6等慢速引擎下随机可能出现js异常。这是css3pie改写页面dom树影响eis页面解析导致的。可以使用css3pie的js加载方式，settimeout 100毫秒延后执行，也可以设置eis的delay参数延后执行eis来避免（建议延后css3pie，基本不影响页面呈现速度）。另外，css3pie可能影响使用span或div的inline兼容模式的颜色渲染，但对使用script的inline模式不构成影响（script内的svg现代浏览器并不支持，但可以加一段js在onload时去掉script wrapper改为正常svg来兼容）。
* 使用jquery的html()或js本身的innerHTML动态生成svg时，由于ie的html parser存在不识别svg元素的问题，以span或div等元素wrap的svg会被丢弃（不识别的就要丢弃吗？这个只能问ie了），只能以script为wrap写入，但其它浏览器无法识别script内的svg。可以封装一个jquery函数，判断浏览器类型来使用不同wrap生成svg内容。
* ie9以上由于浏览器自带svg处理，不能正常使用，但可以声明采用ie8模式得到支持。
* 对于opera 11.60和firefox 4以下浏览器，需要使用eos部件才能在html模式下渲染svg。但需要注意这些浏览器在html parse时存在去除尾部终止符（就是元素尾‘/’）的毛病（同样是无谓的负优化）。因为他们认为这是个html元素，而html元素尾部是不需要/的。这导致再度以svg引擎解析时，并行的多个自终止元素（如一个group内的多个path）会被认作子元素，只能渲染第一个元素。解决方式简单，就是写svg时别用尾部终止符，而是耐心一点用终止元素（也就是如</path>这种），避免解析错误。



