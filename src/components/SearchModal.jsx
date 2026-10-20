import PropTypes from 'prop-types';

const SearchModal = ({ show, onClose, texts }) => {
    if (!show) return null;

    return (
        <div className="modal show d-block" id="searchModal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered modal-fullscreen-lg-down" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h4 className="modal-title" id="SearchModalLabel">{texts.search || 'Search'}</h4>
                        <div className="search-input-wraper">
                            <input placeholder={texts.searchPlaceholder || 'Search the Privacy Center'} />
                            <div className="search-icon-wraper">
                                <svg aria-hidden="true" className="x1lliihq x1k90msu x2h7rmj x1qfuztq xfuq9xy xlup9mm x1kky2od" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                    <path clipRule="evenodd" d="M16.618 18.032a9 9 0 1 1 1.414-1.414l3.675 3.675a1 1 0 0 1-1.414 1.414l-3.675-3.675zM18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" fillRule="evenodd"></path>
                                </svg>
                            </div>
                            <div className="close-search-icon-wraper" style={{ display: 'none' }}>
                                <svg aria-hidden="true" className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1kpxq89 xsmyaan" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                    <path d="M5.707 4.293a1 1 0 1 0-1.414 1.414L10.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414L12 13.414l6.293 6.293a1 1 0 0 0 1.414-1.414L13.414 12l6.293-6.293a1 1 0 1 0-1.414-1.414L12 10.586 5.707 4.293z"></path>
                                </svg>
                            </div>
                        </div>
                        <div id="search-items" style={{ display: 'none' }}>
                            <div className="fake-items" style={{ display: 'none' }}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className="now-found" style={{ display: 'none' }}>
                                <div>
                                    <svg aria-hidden="true" className="" fill="currentColor" height="1em" viewBox="0 0 96 96" width="1em">
                                        <circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px"></circle>
                                        <path d="M48 54.682a3.43 3.43 0 0 1-3.52-3.062l-1.615-22.518a5.136 5.136 0 0 1 10.272 0L51.523 51.62A3.432 3.432 0 0 1 48 54.682zM48 71.046a5.114 5.114 0 1 1 5.114-5.114 5.114 5.114 0 0 1-5.114 5.114z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2px"></path>
                                    </svg>
                                </div>
                                <h4>{texts.nothingFound || 'Nothing found'}</h4>
                                <p>{texts.searchHint || 'Use other keywords or check the spelling of the search term request.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SearchModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    texts: PropTypes.object.isRequired
};

export default SearchModal;
