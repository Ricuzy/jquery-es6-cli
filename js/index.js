// const richText = `<p style="font-size:16px;color:#333333;line-height:30px;font-family:Helvetica,Arial,sans-serif;font-weight:normal;text-align:left;hyphens:auto" data-flag="normal" lang="en">
// <b>
// <b>
// <span data-flag="tag" style="background:#FC5832;font-size:16px;color:#fff;padding:5px;margin:10px 0px;display:inline-block">官方福利</span><span>&nbsp;</span>
// </b>
// </b>
// </p>
// <p style="font-size:16px;color:#333333;line-height:30px;font-family:Helvetica, Arial, sans-serif;font-weight:normal;text-align:left" data-flag="normal" lang="en">
// <strong style="color:#FC5832;word-break:break-all;font-family:Helvetica,Arial,sans-serif;font-weight: normal;">现在添加官方小助手微信</strong>
// 【<strong style="color:#FC5832;word-break:break-all;font-family:Helvetica,Arial,sans-serif;font-weight: normal;">xmly75</strong>】，即可申请加入喜马官方内购群。
// </p></p>
// <p>这是另一个p</p>
// `

const richText = `<p style="font-size: 20px;">这是一个测试</p><span>这是一个span</span><p style="font-size: 16px; word-break: break-all;">即可申请加入喜马官方内购群</p><p style="font-size: 20px;>这是另一个p</p>`

console.log(window.Filter.filterLeading(richText))