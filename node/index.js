console.log(process.memoryUsage());
/*
{
  rss: 22310912, // 进程常驻内存
  heapTotal: 5009408, // V8已经申请到的【堆内存】总量
  heapUsed: 2252296, // V8已经使用的【堆内存】总量
  external: 1212452
}
*/
