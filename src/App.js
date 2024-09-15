import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import EditImagePage from "./pages/EditImagePage";
import ImageEditorPanelPage from "./pages/editor/ImageEditorPanelPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Navigate to="/upload" /> } />
                <Route path="/ok" element={<h1>OK</h1>}/>
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/edit" element={<EditImagePage />} />
                <Route path="/edit/panel" element={<ImageEditorPanelPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
