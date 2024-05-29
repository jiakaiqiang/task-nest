import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("menu") //代表查询那个表
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    path: string; //地址
    @Column()
    component: string; //组件名称
    @Column()
    isHidden: number; //是否隐藏
    @Column()
    isMenu: number; //是否是菜单
    @Column()
    title: string;//菜单名称


}