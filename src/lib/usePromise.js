// 컴포넌트에서 api를 호출 할 때 Promise를 간결하게 사용하기 위한 custom hook

import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
	// 대기 중/완료/실패에 대한 상태 관리
	const [loading, setLoading] = useState(false);
	const [resolved, setResolved] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const process = async () => {
			setLoading(true);
			try {
				const resolved = await promiseCreator();
				setResolved(resolved);
			} catch (e) {
				setError(e);
			}
			setLoading(false);
		};
		process();
		// eslint-disable-next-line
	}, deps);

	return [loading, resolved, error];
}
