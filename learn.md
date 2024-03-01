### nest
创建增删改查指令  nest g resource 资源名

### typeOrm

#### 表连接关系(一对一、一对多、多对多)
在表关系中 会用到@joinColumn() 代表关联的信息字段  默认的话是 是返回属性名和关联表的主键(id)该装饰器后面 必须带有指定的实力类
1. 一对一
``` porfile 证书实体
@Entry()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userId: number;
    @Column()
    bio: string;
   
    @JoinColumn()
    user: User;
}
```

```user 实体
    @Entry()
    export class User {
        @PrimaryGeneratedColumn()
        id: number;
        @Column()
        name: string
        @OneToOne(() => Profile)  //和证书是一对一的关系  证书默认列会有一个profileId 和 Profile 实体关联
       @JoinColumn()    //只能在关系的一侧位于外键的表上
        profile:Profile
    }
```
2. 一对多 或者多对一
``` Photo
@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @ManyToOne(() => User, (user) => user.photos)     userId
    user: User
}
```
``` User
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Photo, (photo) => photo.user)  参数1 代表的是关联的实体 参数二双向关联
    photos: Photo[]
}
```
如果是多一或者一对多的这种情况  都不会去写@joinColumn()  一般在多对一的 实体中 会存在外键  
3. 多对多
 ```  
 @Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
 ```
 ```
 import { Category } from "./Category"

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    text: string

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]
} 
 ```

 @JoinTable() 是 @ManyToMany 关系所必需的。 你必须将 @JoinTable 放在关系的一侧（拥有）。