import { Button, Input } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import { useService } from "../../../hooks/useService";
import { useAppDispatch } from "../../../redux/store";
import { setTemplate } from "../../../redux/templateSlice";
import { TemplateSerive as TemplateService } from "../../../services/Implementations/TemplateSerive";
import { Guid, TemplateModel } from "../../../services/Models/Types";
import './style.css'

export function AllTemplates() {
	const [templates, setTemplates] = useState<TemplateModel[]>();
	const [displayingTemplates, setDisplayingTemplates] = useState<TemplateModel[]>();
	const [searchFilter, setSearchFilter] = useState('');
	const debouncedSerchFilter = useDebounce(searchFilter, 450);
	const templateSerice = useService(TemplateService);
	const navigate = useNavigate();

	const changeClick = (id: Guid) => {
			navigate(`/templates/edit/${id}`)
	};
	const fillClick = (id: Guid) => {
		 navigate(`/templates/fill/${id}`);
	}

	const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchFilter(e.target.value);
	};

	//load templates at component mount
	useEffect(() => {
		templateSerice	.GetTemplates()
			.then(el => {
				setTemplates(el.templates);
				setDisplayingTemplates(el.templates);
			}
			);
	}, []);

	//filter templates
	useEffect(() => {
		if (debouncedSerchFilter != "") {
			const filteredTemplates = templates?.filter(el => el.name.toLocaleLowerCase()
				.includes(debouncedSerchFilter
					.trim()
					.toLocaleLowerCase()));

			setDisplayingTemplates(filteredTemplates);
		} else {
			setDisplayingTemplates(templates);
		}
	}, [debouncedSerchFilter]);

	return (
		<div className='allTemplates__'>
			<div className="allTemplates__body">
				<div className="allTemplates__header">

					<div className="account__info">

					</div>
					
					<div className="allTemplates__search">
						<div className="allTemplates__search__field">
							<Input onChange={handleSearchInput} />
						</div>
						<div className="allTemplates__newTemplate">
							<NavLink to={'/templates/new'}>Новый шаблон</NavLink>
						</div>
						<div className="allTemplates__search__icon">
							
						</div>
					</div>
				</div>

				

				<div className='allTemplates__list'>
					{displayingTemplates?.map((el, index) => <DisplayTemplateComponent key={index} changeAction={changeClick} fillAction={fillClick} template={el} />)}
				</div>

			</div>
		</div>
	);
}

type DisplayTemplateComponentProps = {
	template: TemplateModel,
	changeAction: (id:Guid)=>void,
	fillAction: (id:Guid) => void
}

function DisplayTemplateComponent({ template,	fillAction, changeAction}: DisplayTemplateComponentProps) {
	console.log(template);
	return (
			<div className='allTemplates__list__item'>
					<div>
						{template.name}
					</div>

					<Button type='primary' onClick={()=> fillAction(template.id)}>
							Заполнить
					</Button> 

					<Button type='default' onClick={() => changeAction(template.id)}>
						Изменить
					</Button>
			</div>
	)
}