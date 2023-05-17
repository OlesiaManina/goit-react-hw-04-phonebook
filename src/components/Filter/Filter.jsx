import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({value, onChange}) => (
<label className={css.labelFilter}> Find contacts by name
    <input type="text" value={value} onChange={onChange} className={css.inputFilter}/>
</label>
)

export default Filter;

Filter.prototypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}