import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function About() {
  const [data, setData] = useState({
    name: '',
    studentId: '',
    class: '',
    appName: ''
  });
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(`${API_URL}/about`, { timeout: 5000 });
        setData(response.data);
        setStatus('connected');
      } catch (err) {
        console.error('Error fetching about data:', err);
        setStatus('unreachable');
        setError('Không thể kết nối tới backend. Vui lòng kiểm tra server.');
      }
    };

    fetchAbout();
  }, []);

  return (
    <div className="about-container">
      <h2>Thông Tin Cá Nhân</h2>

      <div className={`status-badge ${status === 'connected' ? 'connected' : 'unreachable'}`}>
        {status === 'connected' ? '✓ Kết nối thành công' : '✗ Không thể kết nối'}
      </div>

      {error && <div className="error">{error}</div>}

      <div className="info-grid">
        <div className="info-item">
          <label>Họ tên:</label>
          <p>{status === 'unreachable' ? 'Unavailable' : data.name || 'N/A'}</p>
        </div>

        <div className="info-item">
          <label>Mã số sinh viên:</label>
          <p>{status === 'unreachable' ? 'Unavailable' : data.studentId || 'N/A'}</p>
        </div>

        <div className="info-item">
          <label>Lớp:</label>
          <p>{status === 'unreachable' ? 'Unavailable' : data.class || 'N/A'}</p>
        </div>

        <div className="info-item">
          <label>Tên ứng dụng:</label>
          <p>{status === 'unreachable' ? 'Unavailable' : data.appName || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
