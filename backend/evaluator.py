class SimpleTextEvaluator:
    def __init__(self):
        print("Đang khởi tạo Evaluator (Chế độ đơn giản: Tìm chuỗi mộc)...")

    def predict(self, text: str) -> bool:
        """
        Logic đánh giá: Trả về True nếu tìm thấy từ khóa.
        Sau này bạn có thể thay bằng logic PyTorch tại đây.
        """
        # Chuyển về chữ thường để dễ tìm kiếm tương đối
        if "đã lưu" in text.lower():
            return True
        return False