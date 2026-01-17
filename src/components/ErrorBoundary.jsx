import { Component } from 'react';
import { trackError } from '../analytics';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // GA4로 에러 전송
    trackError(error, errorInfo);
  }

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              문제가 발생했습니다
            </h1>
            <p className="text-slate-600 mb-6">
              일시적인 오류가 발생했습니다.<br />
              잠시 후 다시 시도해주세요.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl active:scale-95 transition-transform"
              >
                새로고침
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full py-3 bg-slate-200 text-slate-700 font-bold rounded-xl active:scale-95 transition-transform"
              >
                홈으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
