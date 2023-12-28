'use client';
import React, { useState } from 'react';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '../ui/collapsible';
import { Button } from '../ui/button';
import { ChevronsUpDown } from 'lucide-react';
type DocumentsProps = {
	title: string;
	fields: React.ReactNode;
};

const Documents: React.FC<DocumentsProps> = ({ title, fields }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="w-full space-y-2"
		>
			<CollapsibleTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="p-0 w-full rounded-md border border-admin-gray-dark border-opacity-60 px-4 h-[48px] bg-white"
				>
					<div className="flex items-center justify-between w-full">
						<h4 className="text-sm font-medium">{title}</h4>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						<span className="sr-only">Toggle</span>
					</div>
				</Button>
			</CollapsibleTrigger>

			<CollapsibleContent className="space-y-2 rounded-md border border-admin-gray-dark border-opacity-60 px-4 py-4 shadow-sm">
				{fields}
			</CollapsibleContent>
		</Collapsible>
	);
};

export default Documents;
