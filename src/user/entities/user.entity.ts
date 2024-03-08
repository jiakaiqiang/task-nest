import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("user") //代表查询那个表
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 30 })
  username: string; //用户名
  @Column()
  password: string; //密码
}
