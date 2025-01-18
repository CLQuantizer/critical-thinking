SELECT pg_current_wal_lsn();
SELECT pg_walfile_name(pg_current_wal_lsn());
SELECT * FROM pg_create_logical_replication_slot('my_slot', 'test_decoding');
SELECT * FROM pg_logical_slot_get_changes('my_slot', NULL, NULL);
SELECT pg_drop_replication_slot('my_slot');