import { parse } from 'yaml'
const path = require('path');
const fs = require('fs');

// 获取项目运行环境

// 读取项目配置
export const getConfig = () => {

  const yamlPath = path.join(process.cwd(), `./.config/dev.yaml`)
  const file = fs.readFileSync(yamlPath, 'utf8')
  const config = parse(file)
  return config
}