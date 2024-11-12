INSERT INTO tickets (customer_id, title, description, completed, tech, created_at, updated_at)
VALUES
-- Tickets for Customer 1
(1, 'Password reset', 'Customer requested assistance with password reset', false, 'unassigned', NOW(), NOW()),
(1, 'System upgrade', 'Upgrade to latest software version', true, 'Alex', NOW(), NOW()),
(1, 'Software installation', 'Assist with new software installation', false, 'Jordan', NOW(), NOW()),

-- Tickets for Customer 2
(2, 'Account activation', 'Customer needs help activating account', true, 'Taylor', NOW(), NOW()),
(2, 'Virus removal', 'Scan and remove virus from device', false, 'unassigned', NOW(), NOW()),
(2, 'Network setup', 'Assist with setting up a new network', false, 'Alex', NOW(), NOW()),

-- Tickets for Customer 3
(3, 'Email troubleshooting', 'Customer unable to receive emails', true, 'Chris', NOW(), NOW()),
(3, 'Printer setup', 'Assist with connecting printer to network', false, 'Jordan', NOW(), NOW()),
(3, 'File recovery', 'Recover deleted files', false, 'Taylor', NOW(), NOW()),

-- Tickets for Customer 4
(4, 'Hardware installation', 'Install additional RAM', true, 'unassigned', NOW(), NOW()),
(4, 'Software crash issue', 'Fix repeated crashing of application', false, 'Chris', NOW(), NOW()),
(4, 'Data migration', 'Migrate data to new system', true, 'Alex', NOW(), NOW()),

-- Tickets for Customer 5
(5, 'Login issue', 'Customer unable to log into account', false, 'Jordan', NOW(), NOW()),
(5, 'Security assessment', 'Assess and improve security settings', true, 'Taylor', NOW(), NOW()),
(5, 'Backup setup', 'Set up automatic data backup', false, 'Chris', NOW(), NOW()),

-- Tickets for Customer 6
(6, 'Operating system upgrade', 'Upgrade to latest OS version', true, 'unassigned', NOW(), NOW()),
(6, 'Email configuration', 'Configure email client', false, 'Alex', NOW(), NOW()),
(6, 'Remote access setup', 'Enable remote access', true, 'Jordan', NOW(), NOW()),

-- Tickets for Customer 7
(7, 'Account suspension', 'Reinstate suspended account', false, 'Taylor', NOW(), NOW()),
(7, 'Laptop repair', 'Fix broken screen', false, 'unassigned', NOW(), NOW()),
(7, 'Software configuration', 'Configure software settings', true, 'Chris', NOW(), NOW()),

-- Tickets for Customer 8
(8, 'Network troubleshooting', 'Fix unstable network', true, 'Alex', NOW(), NOW()),
(8, 'Disk cleanup', 'Clear temporary files', false, 'Taylor', NOW(), NOW()),
(8, 'Install antivirus', 'Install antivirus software', false, 'Jordan', NOW(), NOW()),

-- Tickets for Customer 9
(9, 'Mobile app issue', 'Fix issue with mobile app login', false, 'Chris', NOW(), NOW()),
(9, 'Device sync', 'Sync multiple devices', true, 'unassigned', NOW(), NOW()),
(9, 'Password update', 'Guide customer to update password', true, 'Alex', NOW(), NOW()),

-- Tickets for Customer 10
(10, 'Database maintenance', 'Regular database maintenance', false, 'Taylor', NOW(), NOW()),
(10, 'System diagnostics', 'Run diagnostics on system', true, 'Jordan', NOW(), NOW()),
(10, 'Email backup', 'Backup all email data', false, 'unassigned', NOW(), NOW()),

-- Tickets for Customer 11
(11, 'Two-factor setup', 'Assist in setting up two-factor authentication', true, 'Alex', NOW(), NOW()),
(11, 'Device upgrade', 'Upgrade to latest device model', false, 'Chris', NOW(), NOW()),
(11, 'Firewall configuration', 'Set up firewall rules', true, 'Taylor', NOW(), NOW()),

-- Tickets for Customer 12
(12, 'Account recovery', 'Assist with recovering account', false, 'Jordan', NOW(), NOW()),
(12, 'Performance tuning', 'Optimize device performance', true, 'unassigned', NOW(), NOW()),
(12, 'App installation', 'Install necessary applications', false, 'Alex', NOW(), NOW()),

-- Tickets for Customer 13
(13, 'Software update', 'Update to the latest software version', true, 'Chris', NOW(), NOW()),
(13, 'Server reboot', 'Scheduled server reboot', false, 'Jordan', NOW(), NOW()),
(13, 'Email filtering', 'Set up email filtering rules', true, 'Taylor', NOW(), NOW()),

-- Tickets for Customer 14
(14, 'User training', 'Train user on new software', false, 'unassigned', NOW(), NOW()),
(14, 'System backup', 'Perform a full system backup', true, 'Alex', NOW(), NOW()),
(14, 'Network upgrade', 'Upgrade network equipment', false, 'Chris', NOW(), NOW()),

-- Tickets for Customer 15
(15, 'Printer repair', 'Repair broken printer', false, 'Taylor', NOW(), NOW()),
(15, 'Data encryption', 'Encrypt sensitive data', true, 'Jordan', NOW(), NOW()),
(15, 'Wi-Fi troubleshooting', 'Resolve Wi-Fi connectivity issues', false, 'unassigned', NOW(), NOW()),

-- Tickets for Customer 16
(16, 'App crash fix', 'Resolve frequent app crashes', true, 'Chris', NOW(), NOW()),
(16, 'Device reset', 'Reset device to factory settings', false, 'Alex', NOW(), NOW()),
(16, 'System security', 'Increase security settings', true, 'Taylor', NOW(), NOW()),

-- Tickets for Customer 17
(17, 'Email account setup', 'Set up new email account', false, 'unassigned', NOW(), NOW()),
(17, 'System clean-up', 'Delete unnecessary files', true, 'Jordan', NOW(), NOW()),
(17, 'Data retrieval', 'Retrieve lost data', false, 'Alex', NOW(), NOW()),

-- Tickets for Customer 18
(18, 'App optimization', 'Optimize app for performance', true, 'Chris', NOW(), NOW()),
(18, 'Disk repair', 'Repair corrupted disk', false, 'unassigned', NOW(), NOW()),
(18, 'User permissions', 'Adjust user permissions', true, 'Taylor', NOW(), NOW()),

-- Tickets for Customer 19
(19, 'VPN setup', 'Set up VPN for remote access', false, 'Jordan', NOW(), NOW()),
(19, 'System audit', 'Audit system for security', true, 'Alex', NOW(), NOW()),
(19, 'Software rollback', 'Rollback to previous software version', false, 'unassigned', NOW(), NOW()),

-- Tickets for Customer 20
(20, 'Network monitoring', 'Set up continuous network monitoring', true, 'Taylor', NOW(), NOW()),
(20, 'Hardware replacement', 'Replace old hardware components', false, 'Chris', NOW(), NOW()),
(20, 'Account suspension', 'Suspend inactive account', true, 'Jordan', NOW(), NOW());
