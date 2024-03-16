import { parse } from 'yaml'
const path = require('path');
const fs = require('fs');

import * as crypto from 'crypto';
// 获取项目运行环境

// 读取项目配置
export const getConfig = () => {

  const yamlPath = path.join(process.cwd(), `./.config/dev.yaml`)
  const file = fs.readFileSync(yamlPath, 'utf8')
  const config = parse(file)
  return config
}

//加密方法
export const encrypt = (data: string) => {
   let salt = crypto.randomBytes(4).toString('base64');
  crypto.pbkdf2Sync(data, salt, 1000, 18, 'sha256').toString('hex');
}