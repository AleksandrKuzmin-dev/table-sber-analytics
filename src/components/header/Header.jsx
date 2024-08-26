import UploadingFiles from '../uploadingFiles/UploadingFiles';
import './Header.css';

const Header = ({ setData, isEditMode, toggleMode }) => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left-wrapper">
            <h1 className="header__title">Таблица</h1>
            <button
              className="header__button-display"
              onClick={() => toggleMode()}
              
            >
              {isEditMode ? 'Нажмите для перехода в режим просмотра' : 'Нажмите для перехода в режим редактирования'}
            </button>
          </div>
          <div className="header__right-wrapper">
            <UploadingFiles setData={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
