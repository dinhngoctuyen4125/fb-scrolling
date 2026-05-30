const processedElements = new WeakSet();

function sendToPython(element) {
    if (processedElements.has(element)) return;
    
    const text = element.innerText;
    if (!text || text.trim().length === 0) return;

    processedElements.add(element);
    const rect = element.getBoundingClientRect();
    
    // Đóng gói dữ liệu
    const payload = {
        text: text.trim(),
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
    };

    // NHỜ NGƯỜI ĐƯA THƯ (BACKGROUND.JS) GỬI ĐI THAY VÌ TỰ FETCH
    try {
        chrome.runtime.sendMessage({
            action: "sendToPython",
            data: payload
        }, (response) => {
            // Lắng nghe câu trả lời từ Python
            if (response && response.is_target === true) {
                // CHÍNH THỨC CHE CHỮ (CENSOR)
                element.style.backgroundColor = "#000000"; // Nền đen
                element.style.color = "#000000";         // Chữ cũng đen luôn
                element.style.borderRadius = "4px";      // Bo góc tí cho đẹp (tùy chọn)
            }
        });
    } catch (error) {
        // Bỏ qua lỗi kết nối nội bộ extension
    }
}

function scanFacebook() {
    const textElements = document.querySelectorAll('div[dir="auto"]'); 
    textElements.forEach(element => {
        const parentArticle = element.closest('div[role="article"]');
        if (parentArticle) {            
            sendToPython(element);
        }
    });
}

setInterval(scanFacebook, 2000);