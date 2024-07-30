import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telegramID: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
