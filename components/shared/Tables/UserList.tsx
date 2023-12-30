'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import LocalSearch from '../Search/LocalSearch';
import SelectFilter from '../Search/SelectFilter';
import { UserStatus } from '@/constants';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { UserStatusFormat, dateFormat } from '@/lib/helper/format';
import { FiEdit } from 'react-icons/fi';
import EmptyError from '../Cards/EmptyError';
import Link from 'next/link';
import Pagination from '../Search/Pagination';
import UserForm from '../Forms/UpdateUserForm';
type UserListProps = {
	data: UserList[];
	pages: number;
};

const UserList: React.FC<UserListProps> = ({ data, pages }) => {
	const [singleUser, setSingleUser] = useState<string | null>(null);

	return (
		<div className="category-list">
			<div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[40px] gap-[20px] mb-[30px]">
				<div className="flex items-center md:justify-start justify-between gap-[20px]"></div>
				<div className="grid grid-cols-5 gap-[20px]">
					<LocalSearch
						route={'/admin/user'}
						iconPosition={'left'}
						placeholder={'Search user'}
						containerClass={
							'bg-white border border-admin-gray-dark border-opacity-70 col-span-3'
						}
						inputClass={'text-primary-black-light'}
						iconClass={'text-primary-black-light text-opacity-40'}
					/>
					<div className="col-span-2">
						<SelectFilter
							filterKey={'status'}
							placeholder={'Filter by status'}
							triggerClass={
								'bg-white border border-admin-gray-dark border-opacity-70 text-primary-black-light text-opacity-60 h-[52px]'
							}
							contentClass={'bg-white'}
							options={UserStatus}
						/>
					</div>
				</div>
			</div>
			{data.length > 0 ? (
				<>
					<Table className="shadow-light-100">
						<TableHeader>
							<TableRow className="border-b border-admin-gray-light border-opacity-25">
								<TableHead className="table-header__bg-tl">
									User
								</TableHead>
								<TableHead className="table-header__bg">
									Join At
								</TableHead>
								<TableHead className="table-header__bg">
									Status
								</TableHead>
								<TableHead className="table-header__bg">
									Last Login
								</TableHead>
								<TableHead className="table-header__bg">
									Role
								</TableHead>
								<TableHead className="table-header__bg-tr">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="bg-white">
							{data.map((user, index) => (
								<Collapsible key={index} asChild>
									<>
										<TableRow>
											<TableCell>
												<div className="flex items-center gap-[8px]">
													<div className="flex items-center gap-[10px]">
														<div className="flex flex-col gap-[5px]">
															<h5 className="heading-5 dark:text-primary-black-light">
																{user.firstName}{' '}
																{user.lastName}
															</h5>
															<span className="text-base-3 !text-primary-orange-dark hover:underline">
																<Link
																	href={`mailto:${user.email}`}
																>
																	{user.email}
																</Link>
															</span>
														</div>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<span className="text-base-2">
													{dateFormat(user.createdAt)}
												</span>
											</TableCell>
											<TableCell>
												<span className="text-base-2">
													{
														UserStatusFormat[
															user.status
														]
													}
												</span>
											</TableCell>
											<TableCell>
												<span className="text-base-2">
													{user.lastLogin
														? dateFormat(
																user.lastLogin,
														  )
														: null}
												</span>
											</TableCell>
											<TableCell>
												<span className="text-base-2">
													{user.role}
												</span>
											</TableCell>
											<TableCell>
												<CollapsibleTrigger asChild>
													<Button
														className="bg-admin-gray-light text-[#7B8ED1]"
														onClick={() => {
															setSingleUser(
																user.id,
															);
														}}
													>
														<FiEdit className="text-[15px]" />
													</Button>
												</CollapsibleTrigger>
											</TableCell>
										</TableRow>
										<CollapsibleContent asChild>
											<>
												<TableRow>
													<TableCell colSpan={6}>
														<UserForm
															userId={singleUser}
														/>
													</TableCell>
												</TableRow>
											</>
										</CollapsibleContent>
									</>
								</Collapsible>
							))}
						</TableBody>
					</Table>
					<Pagination
						pages={pages}
						containerClass={'justify-center mt-[50px]'}
						prevBtnClass={'btn-primary'}
						nextBtnClass={'btn-primary'}
						paginateBtnClass={
							'btn-primary__ghost !bg-transparent dark:text-primary-orange-dark text-primary-orange-dark hover:text-white dark:hover:text-white w-[40px]'
						}
						paginateActiveClass={'btn-primary !text-white'}
					/>
				</>
			) : (
				<EmptyError
					containerClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					thumbnailClass={'sm:w-[70%] w-[80%]'}
					title={'There are no categories to show'}
					description={`Oops! Currently, there are no categories to display. 🏷️ It seems this space is awaiting your creative touch 🌟`}
					Links={undefined}
					titleClass={''}
					descriptionClass={''}
				/>
			)}
		</div>
	);
};

export default UserList;
