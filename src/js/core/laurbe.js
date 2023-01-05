import laurbe from "./core.module.js"
/**CORE */
import "./logger.module.js"
import "./utils.module.js"
import "./templatemanager.module.js"
import "./modalDialog.module.js"
import "./daoManager.module.js"
import "./modalDialog.module.js"
import "./localStorageManager.module.js"
import "./navigator.module.js"
import "./shareSocialManager.module.js"

/**COMPONENTS */
import "../components/baseView.module.js"
import "../components/button.module.js"
import "../components/buttonGroup.module.js"
import "../components/card.module.js"
import "../components/cardGroup.module.js"
import "../components/column.module.js"
import "../components/comment.module.js"
import "../components/commentsGroup.module.js"
import "../components/container.module.js"
import "../components/form.module.js"
import "../components/grid.module.js"
import "../components/image.module.js"
import "../components/layout.module.js"
import "../components/modalDialog.module.js"
import "../components/navbar.module.js"
import "../components/navbarBottom.module.js"
import "../components/navbarBottomMenuItem.module.js"
import "../components/navbarMenuItem.module.js"
import "../components/region.module.js"
import "../components/row.module.js"
import "../components/spotifyAudio.module.js"
import "../components/textField.module.js"
import "../components/textLink.module.js"
import "../components/title.module.js"
import "../components/video.module.js"
import "../components/youTubeVideo.module.js"
import "../components/app/app.module.js"
import "../components/app/view.module.js"

import jQuery from "../../thirdparty/js/jquery.module.js";
window.$ = window.jQuery = jQuery;
console.log('soy el primer import');
console.log(jQuery);


export default laurbe;